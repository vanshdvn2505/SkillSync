import MailService from "../../../services/mail";
import UserService from "../../../services/user";

export const userLogin = async (_: any, payload: { email: string, password: string }, {res}: { res: any }) => {
    const token = await UserService.userLogin({
      email: payload.email,
      password: payload.password
    });

    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return token;
}

export const verifyEmail = async (_ : any, { token }: { token : string }, { res } : { res: any }) => {
    const authToken = await MailService.verifyEmail(token);

    res.cookie("authToken", authToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return "Email Verified Successfully";

}