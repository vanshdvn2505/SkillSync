import UserService, { CreateUserPayload } from "../../../services/user";

export const getCurrentLoggedInUser = async (_: any, parameters: any, context: any) => {
    
    if(context && context.user){
      const id = context.user.id;
      const user = await UserService.getUserById(id);
      
      return user;
    }
    throw new Error("context not found");
}

export const createUser = async (_ : any, payload : CreateUserPayload) => {
    return await UserService.createUser(payload);
}