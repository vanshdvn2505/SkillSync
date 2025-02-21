import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const resolvers = {
    Query: {
        getAllPosts: async () => {
            return await prisma.post.findMany({ include: { author: true, likes: true, comments: true } });
        },
        getPostById: async (_: any, { id }: any) => {
            return await prisma.post.findUnique({ where: { id }, include: { author: true, likes: true, comments: true } });
        },
    },
    Mutation: {
        createPost: async (_: any, { title, content, imageUrl, authorId }: any) => {
            return await prisma.post.create({
                data: { title, content, imageUrl, author: { connect: { id: authorId } } },
                include: { author: true },
            });
        },
        deletePost: async (_: any, { id }: any) => {
            return await prisma.post.delete({ where: { id } });
        },
        likePost: async (_: any, { postId, userId }: any) => {
            return await prisma.post.update({
                where: { id: postId },
                data: { likes: { create: { user: { connect: { id: userId } } } } },
            });
        },
        unlikePost: async (_: any, { postId, userId }: any) => {
            return await prisma.post.update({
                where: { id: postId },
                data: { likes: { deleteMany: { userId } } },
            });
        },
        commentOnPost: async (_: any, { postId, userId, content }: any) => {
            return await prisma.post.update({
                where: { id: postId },
                data: { comments: { create: { content, author: { connect: { id: userId } } } } },
            });
        },
        deleteComment: async (_: any, { commentId }: any) => {
            return await prisma.comment.delete({ where: { id: commentId } });
        },
        sharePost: async (_: any, { postId, userId }: any) => {
            return await prisma.post.create({
                data: { title: "Shared post", content: "Shared post", author: { connect: { id: userId } }, imageUrl: null },
                include: { author: true },
            });
        },
    },
};
