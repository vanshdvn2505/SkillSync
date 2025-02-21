import { GraphQLJSONObject } from "graphql-type-json";
import { RoomServiceClient } from "livekit-server-sdk";
import { getAccessToken } from "./controllers/getAccessToken";
import { createMeeting, getMeetings, joinMeeting, registerMeeting, startMeeting } from "./controllers/meetings";
import { pubsub } from "../chat/resolvers";

const livekitHost = "https://skillsync-hj8nb6r3.livekit.cloud";
const apiKey = process.env.LIVE_KIT_API_KEY;
const apiSecret = process.env.LIVEKIT_SECRET;
const roomService = new RoomServiceClient(livekitHost, apiKey, apiSecret);

const queries = {
    getMeetings: getMeetings,
    
};

const mutations = {
    getAccessToken : getAccessToken,

    createMeeting : createMeeting,

    startMeeting : startMeeting,

    registerMeeting: registerMeeting,

    joinMeeting: joinMeeting,
}

const subscriptions = {
  meetingStarted: {
    subscribe: (_: any, { meetingId }: { meetingId: string }) => {
      // console.log("🛜 Client Subscribing to:", `MEETING_STARTED_${meetingId}`);
      return pubsub.asyncIterableIterator([`MEETING_STARTED_${meetingId}`]);
    },
    resolve: (payload: any) => {
      // console.log("📢 Resolving Payload for Subscription:", payload);
      return payload.meetingStarted; // Ensure this matches the expected structure
    }
  },
};


export const resolvers = { JSONObject: GraphQLJSONObject, queries, mutations, subscriptions };
