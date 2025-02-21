import { prismaClient } from "../lib/db";

export interface createCommunityPayload {
    name: string,
    description?: string,
    capacity?: number,
    profileImageURL?: string,
    skills: string[],
    createdBy: string
}

class CommunityService{

    public static async createCommunity(payload: createCommunityPayload) {
        const { name, description, capacity, profileImageURL, skills, createdBy } = payload;
        
        try {
            const community = await prismaClient.community.create({
                data: {
                    name,
                    description: description || "",
                    capacity: capacity || 30,
                    profileImageURL,
                    skills: skills || [],
                    creator: {
                        connect: { id: createdBy }
                    }
                },
                select: {
                    id: true
                }
            })
            return community.id;
        } catch (error) {
            console.log(error);
            
            throw new Error("Failed To Create Community");
        }
    }

    public static async joinCommunity(userId: string, communityId: string) {
        try {
            const community = await prismaClient.community.findUnique({ 
                where: { id: communityId } ,
                include: { members: true },
            });
            if(!community) throw new Error("Community Not Found");

            const isAlreadyMember = community.members.some(member => member.id === userId);

            if(isAlreadyMember) throw new Error("User is already a mamber");

            if(community.capacity + 1 > community.maxCapacity){
                throw new Error("Cannot Join Community, Max Capacity Reached");
            }

            const updatedCommunity = await prismaClient.community.update({
                where: { id: communityId },
                data: {
                    members: { connect: { id: userId } },
                    capacity: { increment: 1 },
                }
            })
            
            return "Successfully Joined The Community";
            
        } catch (error) {            
            throw new Error("Error Joining Community");
        }
    }

    public static async getCommunityMembers(communityId : string) {
        try {
            const community = await prismaClient.community.findUnique({
                where: { id: communityId },
                include: { members: true },
            });
            if(!community) throw new Error("Community Not Found");

            return community.members;

        } catch (error) {            
            throw new Error("Error")
        }
    }

    public static async getJoinedCommunities(userId: string) {
        try {
            const user = await prismaClient.user.findUnique({
                where: { id: userId },
                include: {
                    joinedCommunities: true,
                },
            });
        

            if(!user){
                throw new Error("User Not Found");
            }

            return user?.joinedCommunities || [];
            
        }
        catch (error) {
            throw new Error("Something went wrong")    
        }
    }

    public static async leaveCommunity(userId : string, communityId: string) {
        try {
            const community = await prismaClient.community.findUnique({
                where: { id: communityId },
                include: { members: { where: { id: userId } } },
            })

            if(!community) throw new Error("Community Not Found");

            if(!community.members.length) throw new Error('User is not a member of this community');

            await prismaClient.community.update({
                where: { id: communityId },
                data: {
                    members: {
                        disconnect: { id: userId },
                    },
                },
            })

            return "Successfully Left Community";
        }
        catch (error) {
            throw new Error("Something went wrong");    
        }
    }

    public static async getCommunities(userId: string) {
        try {
            const communities = await prismaClient.community.findMany({
                select: {
                    id: true,
                    name: true,
                    description: true,
                    capacity: true,
                    maxCapacity: true,
                    profileImageURL: true,
                    skills: true,
                    rating: true,
                    createdById: true,
                    createdAt: true,
                    creator: {
                        select: {
                            id: true,
                            firstName: true,
                            lastName: true,
                            email: true,
                            profileImageURL: true,
                        }
                    },
                    members: {
                        select: {
                            id: true
                        }
                    },
                    meetings: {
                        include: {
                            attendees: true
                        }
                    }
                }
            });            

            return communities.map(community => ({
                ...community,
                membersCount: community.members.length,
                isJoined: community.members.some(member => member.id === userId),
            }));
        }
        catch (error) {
            throw new Error("Something went wrong");    
        }   
    }

    public static async getCommunityById(communityId: string) {
        try {
            const community = await prismaClient.community.findUnique({
                where : { id : communityId },
                include : {
                    creator: true, 
                    members: true,
                    chat: {
                        include: {
                            sender: true,
                        }
                    },
                    meetings: {
                        include: {
                            attendees: true
                        }
                    }
                }
            })

            if(!community) throw new Error("Community Not Found");

            return community;
        }
        catch (error) {
            throw new Error("Something Went Wrong");    
        }
    }

}

export default CommunityService;