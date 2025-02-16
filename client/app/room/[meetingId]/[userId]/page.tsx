'use client';
import {
  ControlBar,
  GridLayout,
  LiveKitRoom,
  ParticipantTile,
  RoomAudioRenderer,
  useTracks,
} from '@livekit/components-react';

import '@livekit/components-styles';

import { useEffect, useState } from 'react';
import { Track } from 'livekit-client';
import { useMutation } from '@apollo/client';
import { GET_ACCESS_TOKEN, START_MEETING } from '@/graphql/mutations/meetingMutations';
import { useParams } from 'next/navigation';

export default function Page() {
  // { meetingId, userId } : { meetingId: string, userId : string }
  // const meetingId = "8c34084d-3768-4de6-aaff-0d1d65efa67c";
  // const userId = "af1fe65c-8074-4356-ad21-e4f02754297e";
  const { meetingId, userId } = useParams();
  const [token, setToken] = useState<string>("");
  const [roomName, setRoomName] = useState<string | null>(null);

  const [getAccessToken] = useMutation(GET_ACCESS_TOKEN);
  const [startMeeting] = useMutation(START_MEETING);

  useEffect(() => {
    (async () => {
      try {
        const generatedRoom = `meeting-${meetingId}`
        setRoomName(generatedRoom);

        const { data } = await getAccessToken({
          variables: { roomName: generatedRoom, userName: userId },
        }) 

        setToken(data.getAccessToken);

      }
      catch (e) {
        console.error(e);
      }
    })();
  }, [meetingId, userId, getAccessToken, startMeeting]);

  if (token === '') {
    return <div>Getting token...</div>;
  }

  return (
    <LiveKitRoom
      video={true}
      audio={true}
      token={token}
      serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
      // Use the default LiveKit theme for nice styles.
      data-lk-theme="default"
      style={{ height: '100dvh' }}
    >
      {/* Your custom component with basic video conferencing functionality. */}
      <MyVideoConference />
      {/* The RoomAudioRenderer takes care of room-wide audio for you. */}
      <RoomAudioRenderer />
      {/* Controls for the user to start/stop audio, video, and screen
      share tracks and to leave the room. */}
      <ControlBar />
    </LiveKitRoom>
  );
}

function MyVideoConference() {
  // `useTracks` returns all camera and screen share tracks. If a user
  // joins without a published camera track, a placeholder track is returned.
  const tracks = useTracks(
    [
      { source: Track.Source.Camera, withPlaceholder: true },
      { source: Track.Source.ScreenShare, withPlaceholder: false },
    ],
    { onlySubscribed: false },
  );
  return (
    <GridLayout tracks={tracks} style={{ height: 'calc(100vh - var(--lk-control-bar-height))' }}>
      {/* The GridLayout accepts zero or one child. The child is used
      as a template to render all passed in tracks. */}
      <ParticipantTile />
    </GridLayout>
  );
}