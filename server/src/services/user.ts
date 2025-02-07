import { createHmac, randomBytes } from "crypto";
import {prismaClient} from '../lib/db'
import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer'
import { Role } from "@prisma/client";

const JWT_SECRET = '123456';

export interface CreateUserPayload {
    firstName: string;
    lastName?: string;
    email: string;
    password: string;
    role: Role;
}

export interface GetUserTokenPayload {
    email: string;
    password: string;
}

class UserService {

    private static generateHash(salt: string, password: string){
        return createHmac("sha256", salt).update(password).digest('hex');
    }

    private static async sendVerificationEmail(email: string, link: string) {

        const receiver = {
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: "SkillSync: Verify Your Email",
            html: `<p>Click <a href="${link}">here</a> to verify and log in.</p>`
        }

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            secure: true,
            port: 465,
            auth: {
                user: process.env.SENDER_EMAIL,
                pass: process.env.SENDER_PASS
            }
        });

        await transporter.sendMail(receiver);
        
        
        return "Verification Mail Sent";
    }

    private static getUserByEmail(email: string) {
        return prismaClient.user.findUnique({ where: { email : email}})
    }

    public static getUserById(id: string) {
        return prismaClient.user.findUnique({ where: { id } })
    }

    public static async createUser(payload: CreateUserPayload){
        const { firstName, lastName, email, password} = payload;

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
                // role,
                password: hashedPassword,
                isVerified: false
            }
        });

        const verifyToken = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "1h" });
        const verifyLink = `${process.env.FRONTEND_URL}/verify?token=${verifyToken}`;

        await UserService.sendVerificationEmail(user.email, verifyLink);
        return "Verification Link Sent"; 
    }


    public static async getUserToken(payload: GetUserTokenPayload) {
        const { email, password } = payload;
        const user = await UserService.getUserByEmail(email);

        if(!user) throw new Error("user not found");

        const userSalt = user.salt;
        const userHashedPassword = UserService.generateHash(userSalt, password);

        if(userHashedPassword != user.password) throw new Error("incorrect password");

        const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {expiresIn: "7d"});
        return token;
    }

    public static async verifyEmail(token : string){
        try {
            const decoded = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload;
        
            if (!decoded.userId) {
                throw new Error("Invalid Token Structure");
            }
            const user = await prismaClient.user.update({
                where: { id: decoded.userId },
                data: { isVerified: true }
            });

            const authToken = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "7d" });

            return authToken;
        } catch (error) {  
            throw new Error('Invalid Or Expired Token')
        }
    }

    public static decodeJWTToken(token: string) {
        return jwt.verify(token, JWT_SECRET);
    }

    
}

export default UserService