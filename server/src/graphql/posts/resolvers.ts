import { PrismaClient } from '@prisma/client';
import { prismaClient } from '../../lib/db';

export const resolvers = {
    Query: {
        getAllPosts: async () => {
            return await prismaClient.post.findMany({
                include: {
                    author: { select: { id: true, firstName: true, lastName: true, profileImageURL: true } },
                    likes: {
                        include: {
                            user: true
                        }
                    },
                    comments: {
                        include: {
                            author: true
                        }
                    },
                    tags: true
                },
            });
        },
        getPostById: async (_: any, { id }: any) => {
            return await prismaClient.post.findUnique({
                where: { id },
                include: {
                    author: { select: { id: true, firstName: true, lastName: true, profileImageURL: true } },
                    likes: true,
                    comments: true,
                    tags: true
                },
            });
        },
    },
    Mutation: {
        createPost: async (_: any, { title, content, imageUrl, authorId, tags }: any) => {
            return await prismaClient.post.create({
                data: {
                    title,
                    content,
                    imageUrl,
                    author: { connect: { id: authorId } },
                    tags: {
                        connectOrCreate: tags.map((tag: string) => ({
                            where: { name: tag },
                            create: { name: tag },
                        })),
                    },
                },
                include: {
                    author: { select: { id: true, firstName: true, lastName: true, profileImageURL: true } },
                    tags: true
                },
            });
        },
        deletePost: async (_: any, { id }: any) => {
            return await prismaClient.post.delete({ where: { id } });
        },
        likePost: async (_: any, { postId, userId }: any) => {
            return await prismaClient.post.update({
                where: { id: postId },
                data: { likes: { create: { user: { connect: { id: userId } } } } },
            });
        },
        unlikePost: async (_: any, { postId, userId }: any) => {
            return await prismaClient.post.update({
                where: { id: postId },
                data: { likes: { deleteMany: { userId } } },
            });
        },
        commentOnPost: async (_: any, { postId, userId, content }: any) => {
            return await prismaClient.post.update({
                where: { id: postId },
                data: { comments: { create: { content, author: { connect: { id: userId } } } } },
            });
        },
        deleteComment: async (_: any, { commentId }: any) => {
            return await prismaClient.comment.delete({ where: { id: commentId } });
        },
        sharePost: async (_: any, { postId, userId }: any) => {
            return await prismaClient.post.create({
                data: {
                    title: "Shared post",
                    content: "Shared post",
                    author: { connect: { id: userId } },
                    imageUrl: null,
                },
                include: { author: { select: { id: true, firstName: true, lastName: true, profileImageURL: true } } },
            });
        },
    },
};