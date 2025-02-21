import { AccessToken } from "livekit-server-sdk";
import { prismaClient } from "../lib/db";
import { ApolloError } from "apollo-server-core";
import { MeetingLevel } from "@prisma/client";
import { pubsub } from "../graphql/chat/resolvers";

class MeetingService {
    public static async getAccessToken({ roomName, userName }: { roomName: string, userName: string }) {
        const user = await prismaClient.user.findUnique({
            where: { id: userName }
        });

        if (!user) throw new Error("User Not Found");

        const at = new AccessToken(process.env.LIVEKIT_API_KEY, process.env.LIVEKIT_API_SECRET, {
            identity: userName,

            ttl: '10m',
        });
        if (user.role === "Mentor") {
            at.addGrant({
                room: roomName,
                roomJoin: true,
                canPublish: true,
                canSubscribe: true,
                canPublishData: true,
                //   canManageRoom: true, // Full control for mentors
                //   canUpdate: true,
                //   canRemoveOthers: true,
            });
        }
        else {
            at.addGrant({
                room: roomName,
                roomJoin: true,
                canPublish: true,
                canSubscribe: true,
                canPublishData: false,
                //   canManageRoom: false,
                //   canUpdate: false,
                //   canRemoveOthers: false,
            });
        }
        const token = await at.toJwt();
        const role = user.role;

        return { token, role };

    }

    public static async createMeeting({
        title,
        description,
        scheduledAt,
        userId,
        communityId,
        tags,
        maxAttendees,
        duration,
        level
    }: { title: string, description: string, scheduledAt: string, userId: string, communityId: string, tags: [string], maxAttendees: number, duration: number, level: MeetingLevel }) {
        try {
            const mentor = await prismaClient.user.findUnique({
                where: { id: userId },
                include: { joinedCommunities: true },
            });

            if (!mentor) {
                throw new ApolloError("Mentor not found");
                return;
            }

            const isMentorInCommunity = mentor.joinedCommunities.some(
                (community) => community.id === communityId
            );

            if (!isMentorInCommunity) {
                throw new ApolloError("Mentor does not belong to this community");
                return;
            }

            return await prismaClient.meeting.create({
                data: {
                    title,
                    description,
                    scheduledAt: new Date(scheduledAt),
                    mentorId: userId,
                    communityId: communityId,
                    tags,
                    maxAttendees,
                    duration,
                    status: "SCHEDULED",
                    level
                },
                include: {
                    mentor: true,
                    community: true
                }
            })
        }
        catch (error) {
            throw new Error("Something Went Wrong");
        }
    }

    public static async startMeeting({ meetingId, userId }: { meetingId: string; userId: string }) {
        try {
            const meeting = await prismaClient.meeting.findUnique({ where: { id: meetingId } });

            if (!meeting) {
                throw new Error("Meeting not found");
            }

            if (meeting.mentorId !== userId) {
                throw new Error("Not authorized. Only the mentor can start the meeting.");
            }

            if (meeting.isStarted) {
                throw new Error("Meeting has already started.");
            }

            const updatedMeeting = await prismaClient.meeting.update({
                where: { id: meetingId },
                data: { isStarted: true, startedAt: new Date(), status: "ACTIVE" },
                include: {
                    mentor: true,
                    community: true
                }
            });
            //   console.log(updatedMeeting);


            pubsub.publish(`MEETING_STARTED_${meeting.id}`, { meetingStarted: updatedMeeting });
            // console.log("📢 Meeting Started Event Published:", updatedMeeting);

            return updatedMeeting;
        }
        catch (error: any) {
            console.error("Error starting meeting:", error.message);
            throw new Error("Failed to start meeting. Please try again.");
        }
    }

    public static async registerMeeting({ meetingId, userId }: { meetingId: string, userId: string }) {
        try {
            const meeting = await prismaClient.meeting.findUnique({
                where: { id: meetingId },
                include: { attendees: true },
            });

            if (!meeting) throw new ApolloError("Meeting not found");

            if (meeting.attendees.length >= meeting.maxAttendees) {
                throw new ApolloError("Meeting is full");
            }

            return await prismaClient.meeting.update({
                where: { id: meetingId },
                data: {
                    attendees: { connect: { id: userId } },
                },
                include: { mentor: true, attendees: true },
            });
        }
        catch (error) {
            throw new Error("Something Went Wrong!")
        }
    }

    public static async joinMeeting({ meetingId, userId }: { meetingId: string, userId: string }) {
        try {
            const meeting = await prismaClient.meeting.findUnique({
                where: { id: meetingId },
                include: { attendees: true },
            });

            if (!meeting) throw new ApolloError("Meeting not found");

            if (meeting.status !== "ACTIVE") {
                throw new ApolloError("Meeting has not started yet");
            }

            const isRegistered = meeting.attendees.some((attendee) => attendee.id === userId);

            if (!isRegistered) {
                throw new ApolloError("You are not registered for this meeting");
            }

            return `User ${userId} has successfully joined the meeting`;
        }
        catch (error) {
            throw new Error("Something Went Wrong");
        }
    }

    public static async getMeetings({ communityId }: { communityId: string }) {
        try {
            const meetings = await prismaClient.meeting.findMany({
                where: { communityId: communityId },
                include: {
                    mentor: true,
                    attendees: true,
                    community: true
                }
            })


            if (!meetings) {
                throw new Error("No Meetings Found");
            }

            return meetings;
        }
        catch (error) {
            throw new Error("Something Went Wrong");
        }
    }
}

export default MeetingService