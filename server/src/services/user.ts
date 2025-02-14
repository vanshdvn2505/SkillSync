import { createHmac, randomBytes } from "crypto";
import {prismaClient} from '../lib/db'
import jwt from 'jsonwebtoken'
import { Role } from "@prisma/client";
import MailService from "./mail";
const JWT_SECRET = process.env.JWT_SECRET || "123456";

export interface CreateUserPayload {
    firstName: string;
    lastName?: string;
    email: string;
    password: string;
    role: Role;
    gender: string;
}

export interface GetUserTokenPayload {
    email: string;
    password: string;
}

class UserService {

    private static generateHash(salt: string, password: string){
        return createHmac("sha256", salt).update(password).digest('hex');
    }

    public static decodeJWTToken(token: string) {
        return jwt.verify(token, JWT_SECRET);
    }
    
    private static getUserByEmail(email: string) {
        return prismaClient.user.findUnique({ where: { email : email}})
    }

    public static getUserById(id: string) {
        return prismaClient.user.findUnique({ where: { id } })
    }

    public static async createUser(payload: CreateUserPayload){
        const { firstName, lastName, role, gender, email, password} = payload;

        const alreadyExists = await prismaClient.user.findUnique({ where: { email: email }});
        
        if(alreadyExists) {
            throw new Error("user alredy exists.");
        }

        const salt = randomBytes(32).toString("hex");
        const hashedPassword = UserService.generateHash(salt, password);

        const user = await prismaClient.user.create({
            data: {
                firstName,
                lastName,
                email,
                salt,
                role,
                gender,
                password: hashedPassword,
                isVerified: false
            },
        });

        const verifyToken = jwt.sign({ 
            userId: user.id,
            firstName: firstName,
            lastName: lastName,
            email: email,
            role: role,
            gender: gender

         }, JWT_SECRET, { expiresIn: "1h" });
        const verifyLink = `${process.env.FRONTEND_URL}/verifyEmail/${verifyToken}`;

        await MailService.sendVerificationEmail(user.email, verifyLink);
        return "Verification Link Sent"; 
    }

    public static async userLogin(payload: GetUserTokenPayload) {
        const { email, password } = payload;
        const user = await UserService.getUserByEmail(email);

        
        if(!user) throw new Error("user not found");

        if(!user.isVerified){
            throw new Error("Email Not Verified");
        }

        const userSalt = user.salt;
        const userHashedPassword = UserService.generateHash(userSalt, password);

        if(userHashedPassword != user.password) throw new Error("incorrect password");

        const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {expiresIn: "7d"});
        return token;
    }
}

export default UserService