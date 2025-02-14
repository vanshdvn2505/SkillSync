import UserService, { CreateUserPayload } from "../../services/user";

const queries = {
  getUserToken: async (_: any, payload: { email: string, password: string }, {res}: { res: any }) => {
    const token = await UserService.getUserToken({
      email: payload.email,
      password: payload.password
    });
    
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return token;
  },

  getCurrentLoggedInUser: async (_: any, parameters: any, context: any) => {
    if(context && context.user){
      const id = context.user.id;
      const user = await UserService.getUserById(id);
      return user;
    }
    throw new Error("context not found");
  }
};

const mutations = {

  createUser: async (_ : any, payload : CreateUserPayload) => {
    return await UserService.createUser(payload);
  },

  verifyEmail: async (_ : any, { token }: { token : string }, { res } : { res: any }) => {
    const authToken = await UserService.verifyEmail(token);

    res.cookie("authToken", authToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return "Email Verified Successfully";

  }
};

export const resolvers = { queries, mutations };