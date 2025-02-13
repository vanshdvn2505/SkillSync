import nodemailer from 'nodemailer'
import jwt from 'jsonwebtoken'
import { prismaClient } from '../lib/db';
const JWT_SECRET = process.env.JWT_SECRET || "123456";


class MailService {
    public static async sendVerificationEmail(email: string, link: string) {
    
        const receiver = {
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: "SkillSync: Verify Your Email",
            text: `Click the following link to verify your email: ${link}`,
            html: `<p>Click <a href="${link}" target="_blank" rel="noopener noreferrer">here</a> to verify and log in.</p>
                   <p>Or copy and paste this link into your browser: <br> <strong>${link}</strong></p>`
        };
    
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
}

export default MailService