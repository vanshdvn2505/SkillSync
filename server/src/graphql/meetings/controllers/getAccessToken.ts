import MeetingService from "../../../services/meeting"

export const getAccessToken = async (_:any, { roomName, userName } : {roomName: string, userName: string }) => {
    return await MeetingService.getAccessToken({ roomName, userName });
}