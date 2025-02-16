import { MeetingLevel } from "@prisma/client";
import MeetingService from "../../../services/meeting"

export const createMeeting = async (_: any, { title,
    description,
    scheduledAt,
    userId,
    communityId,
    tags,
    maxAttendees,
    duration,
    level
    } : { title: string, description: string, scheduledAt: string, userId: string, communityId: string, tags: [string], maxAttendees: number, duration: number, level: MeetingLevel }) => {
    return await MeetingService.createMeeting({ title, description, scheduledAt, userId, communityId, tags, maxAttendees, duration, level });
}

export const startMeeting = async (_: any, { meetingId, userId } : { meetingId: string, userId : string }) => {
    return await MeetingService.startMeeting({ meetingId, userId });
}

export const registerMeeting = async (_: any, { meetingId, userId } : { meetingId: string, userId: string }) => {
    return await MeetingService.registerMeeting({ meetingId, userId });
}

export const joinMeeting = async (_: any, { meetingId, userId } : { meetingId: string, userId: string }) => {
    return await MeetingService.joinMeeting({ meetingId, userId });
}

export const getMeetings = async (_: any, { communityId } : { communityId: string }) => {
    return await MeetingService.getMeetings({ communityId });
}
