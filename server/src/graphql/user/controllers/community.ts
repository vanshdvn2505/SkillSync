import CommunityService, { createCommunityPayload } from "../../../services/community";

export const createCommunityFunc = async (_: any, payload: createCommunityPayload) => {
    return await CommunityService.createCommunity(payload);
}

export const joinCommunity = async (_: any, payload: { userId: string, communityId: string }) => {
    return await CommunityService.joinCommunity(payload.userId, payload.communityId);
}

export const getCommunityMembers = async (_: any, {communityId } : { communityId: string }) => {
    return await CommunityService.getCommunityMembers(communityId);
}

export const getJoinedCommunities = async (_: any, { userId } : { userId: string }) => {
    return await CommunityService.getJoinedCommunities(userId);
}

export const leaveCommunity = async (_: any, { userId, communityId } : { userId: string, communityId: string }) => {
    return await CommunityService.leaveCommunity(userId, communityId);
}

export const getCommunities = async (_: any, { userId } : { userId : string }) => {
    return await CommunityService.getCommunities(userId);
}

export const getCommunityById = async (_: any, { communityId } : { communityId : string }) => {
    return await CommunityService.getCommunityById(communityId);
}