'use client';
import {
  ControlBar,
  GridLayout,
  LiveKitRoom,
  ParticipantTile,
  RoomAudioRenderer,
  useParticipants,
  useRoomContext,
  useTracks,
} from '@livekit/components-react';

import '@livekit/components-styles';

import { useEffect, useState } from 'react';
import { LocalParticipant, RemoteParticipant, Track } from 'livekit-client';
import { useMutation } from '@apollo/client';
import { GET_ACCESS_TOKEN, START_MEETING } from '@/graphql/mutations/meetingMutations';
import { useParams, useRouter } from 'next/navigation';

export default function Page() {
  // { meetingId, userId } : { meetingId: string, userId : string }
  // const meetingId = "8c34084d-3768-4de6-aaff-0d1d65efa67c";
  // const userId = "af1fe65c-8074-4356-ad21-e4f02754297e";
  const { meetingId, userId } = useParams();
  const [token, setToken] = useState<string>("");
  const [roomName, setRoomName] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<string>("Learner");

  const [getAccessToken] = useMutation(GET_ACCESS_TOKEN);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      try {
        const generatedRoom = `meeting-${meetingId}`
        setRoomName(generatedRoom);

        const { data } = await getAccessToken({
          variables: { roomName: generatedRoom, userName: userId },
        }) 

        console.log(data);
        
        setToken(data.getAccessToken.token);
        setUserRole(data.getAccessToken.role);

      }
      catch (e) {
        console.error(e);
      }
    })();
  }, [meetingId, userId, getAccessToken]);

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
      onDisconnected={ () => router.push('/home') }
    >
      {/* Your custom component with basic video conferencing functionality. */}
      <MyVideoConference role={userRole}/>
      {/* The RoomAudioRenderer takes care of room-wide audio for you. */}
      <RoomAudioRenderer />
      {/* Controls for the user to start/stop audio, video, and screen
      share tracks and to leave the room. */}
      <ControlBar />
    </LiveKitRoom>
  );
}

function MyVideoConference({ role } : { role : string }) {
  // useTracks returns all camera and screen share tracks. If a user
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

      {/* {role === "Mentor" && <MentorControls />} */}
    </GridLayout>
  );
}

function MentorControls() {
  const room = useRoomContext();
  const participants = useParticipants(); // Get all participants

  // const toggleMute = (participant: RemoteParticipant | LocalParticipant) => {
  //   participant.audioTracks.forEach((trackPublication) => {
  //     trackPublication.track?.setMuted(!trackPublication.isMuted);
  //   });
  // };

  // const removeParticipant = (participant: Participant) => {
  //   room.disconnectParticipant(participant.sid);
  // };

  return (
    <div className="mentor-controls bg-gray-800 p-4 text-white rounded-md">
      <h3 className="text-lg font-semibold mb-2">Participant List</h3>
      <ul>
        {participants.map((participant) => (
          <li key={participant.identity} className="flex justify-between p-2">
            <span>{participant.identity}</span>
            <button
              // onClick={() => toggleMute(participant)}
              className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
            >
              {participant.isMicrophoneEnabled ? "Mute" : "Unmute"}
            </button>
            <button
              // onClick={() => removeParticipant(participant)}
              className="bg-red-500 text-white px-2 py-1 rounded"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}