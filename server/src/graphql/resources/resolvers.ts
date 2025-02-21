import { prismaClient } from "../../lib/db";

const queries = {
    getResources: async (_: any, { communityId }: { communityId: string }) => {
        return await prismaClient.resource.findMany({
            where: { communityId },
            include: {
                mentor: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                    },
                },
            },
        });
    },
};

const mutations = {
    uploadFile: async (_: any, { title, fileUrl, tags, communityId, mentorId }: {
        title: string, fileUrl: string, tags: string[], communityId: string, mentorId: string
    }) => {
        const file = await prismaClient.resource.create({
            data: {
                title,
                fileUrl,
                tags,
                communityId,
                mentorId,
            },
            include: {
                mentor: true,
                community: true
            }
        })
        return file;
    },

    deleteResource: async (_: any, { resourceId, mentorId }: { resourceId: string; mentorId: string }) => {
        const resource = await prismaClient.resource.findUnique({
            where: { id: resourceId },
        });

        if (!resource) throw new Error("Resource not found");

        if (resource.mentorId !== mentorId) {
            throw new Error("Unauthorized: Only the mentor can delete this resource");
        }


        await prismaClient.resource.delete({ where: { id: resourceId } });

        return true;
    },
}




export const resolvers = { queries, mutations };
