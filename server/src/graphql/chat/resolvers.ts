import { PubSub } from "graphql-subscriptions";
import { prismaClient } from "../../lib/db";
export const pubsub = new PubSub();
const MESSAGE_ADDED = "MESSAGE_ADDED";

const queries = {

    getCommunityChat: async (_:any, { communityId } : { communityId : string }) => {
        return await prismaClient.chatMessage.findMany({
            where: { communityId: communityId },
            orderBy: {createdAt: 'asc'},
            include: {
                sender: true,
            }
        })
    }

};

const mutations = {

  sendMessage: async (_: any, { content, senderId, communityId } : { content: string, senderId: string, communityId: string }) => {
    const message = await prismaClient.chatMessage.create({
        data: { 
            content,
            senderId,
            communityId,
        },
        include: { 
            sender: true,
        }
    });
    pubsub.publish(MESSAGE_ADDED, { messageAdded: message });
    return message;
  }

};

const subscriptions = {
    messageAdded: {
        subscribe: () => {
            console.log("🔴 Subscription triggered!");
            return pubsub.asyncIterableIterator([MESSAGE_ADDED]);
          }
    }
}

export const resolvers = { queries, mutations, subscriptions };