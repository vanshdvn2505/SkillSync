
import { CreateUserPayload } from "../../services/user";
import { userLogin, verifyEmail } from "./controllers/auth";
import { createCommunityFunc, getCommunities, getCommunityById, getCommunityMembers, getJoinedCommunities, joinCommunity, leaveCommunity } from "./controllers/community";
import { createUser, getCurrentLoggedInUser } from "./controllers/user";

const queries = {

  getCurrentLoggedInUser: getCurrentLoggedInUser,

  getCommunityMembers: getCommunityMembers,
  
  getJoinedCommunities: getJoinedCommunities,

  getCommunities: getCommunities,

  getCommunityById: getCommunityById,
};

const mutations = {

  userLogin: userLogin,

  verifyEmail: verifyEmail,

  createUser: createUser,

  createCommunity : createCommunityFunc,

  joinCommunity: joinCommunity,


  leaveCommunity: leaveCommunity,

};

export const resolvers = { queries, mutations };