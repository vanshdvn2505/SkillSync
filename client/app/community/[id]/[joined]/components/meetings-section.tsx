import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Clock, User, Users } from "lucide-react";
import React from "react";
import CreateMeetingForm from "./createCommunityForm";
import { addMinutes, format, differenceInMinutes, set } from "date-fns";
import { useMutation, useQuery, useSubscription } from "@apollo/client";
import { GET_MEETINGS } from "@/graphql/queries/meetingQueries";
import { useToast } from "@/hooks/use-toast";
import { REGISTER_MEETING, START_MEETING } from "@/graphql/mutations/meetingMutations";
import { MEETING_STARTED_SUBSCRIPTION } from "@/graphql/subscriptions/meetingSubscriptions";

const MeetingsSection = ({ communityId, userId, role }: { communityId: string; userId: string; role: string }) => {
  const { toast } = useToast();
  const { data, loading, error } = useQuery(GET_MEETINGS, { variables: { communityId } });

  const [registerMeeting] = useMutation(REGISTER_MEETING);
  const [startMeeting] = useMutation(START_MEETING);
  const [selectedMeetingId, setSelectedMeetingId] = React.useState<string | null>(null);
  



  const handleRegister = async (meetingId: string) => {
    try {
      const { data: mutationData } = await registerMeeting({
        variables: { meetingId, userId },
        update(cache, { data: mutationData }) {
          if (!mutationData?.registerMeeting) return;

          const meetingCacheId = cache.identify({ id: meetingId, __typename: "Meeting" });

          if (!meetingCacheId) {
            console.error("Meeting not found in cache!");
            return;
          }

          cache.modify({
            id: meetingCacheId,
            fields: {
              attendees(existingAttendees = []) {
                const userRef = cache.identify({ id: userId, __typename: "User" });

                if (!userRef) return existingAttendees;

                if (existingAttendees.some((attendee: any) => attendee.__ref === userRef)) {
                  return existingAttendees;
                }

                return [...existingAttendees, { __ref: userRef }];
              },
            },
          });
        },
      });

      if (mutationData?.registerMeeting) {
        toast({ title: "Registration Successful", description: "You have successfully registered for the meeting." });
      } else {
        throw new Error("Registration failed");
      }
    } catch (error: any) {
      console.log(error);
      toast({ title: "Error", description: error.message || "Failed to register for the meeting.", variant: "destructive" });
    }
  };

  const handleStartMeeting = async (meetingId: string) => {
    try {
      await startMeeting({ variables: { meetingId, userId } });
      setSelectedMeetingId(meetingId)
      toast({ title: "Meeting Started", description: "The meeting has started successfully." });
    }
    catch (error: any) {
      console.log(error);
      toast({ title: "Error", description: error.message || "Failed to start the meeting.", variant: "destructive" });
    }
  };

  const { data: subscriptionData, loading: subLoading, error: subError } = useSubscription(
    MEETING_STARTED_SUBSCRIPTION,
    {
      variables: { meetingId: selectedMeetingId },
      onSubscriptionData: ({ subscriptionData }) => {
        console.log("📡 Subscription received:", subscriptionData);
      },
      
    }
  );
  
  // Debug logs
  console.log("🔍 Subscription Hook Running - Meeting ID:", selectedMeetingId);
  console.log("📡 Subscription Data:", subscriptionData);
  console.log("⚠️ Subscription Error:", subError);

  if (loading) return <p className="text-primary-foreground">Loading meetings...</p>;
  if (error) return <p className="text-primary-foreground">Error loading meetings.</p>;

  const meetings = data?.getMeetings || [];

  return (
    <Card className="bg-foreground text-primary-foreground border-none">
      <CardContent className="pt-6">
        <div className="flex justify-between mb-6">
          <h2 className="text-2xl font-bold">Upcoming Meetings</h2>
          {role === "Mentor" && <CreateMeetingForm communityId={communityId} userId={userId} />}
        </div>
        <div className="space-y-8">
          {meetings.map((meeting: any) => {
            const scheduledTime = new Date(Number(meeting.scheduledAt));
            const currentTime = new Date();
            const minutesToStart = differenceInMinutes(scheduledTime, currentTime);
            const hours = Math.floor(minutesToStart / 60);
            const minutes = minutesToStart % 60;
            const meetingStarted = minutesToStart <= 0;

            return (
              <div key={meeting.id} className="bg-popover rounded-lg p-6 shadow-sm">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl text-primary-foreground font-semibold mb-2">{meeting.title}</h3>
                    <p className="text-muted mb-4">{meeting.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {meeting.tags.map((tag: string) => (
                        <Badge key={tag} className="bg-primary/30">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <Badge
                    className={`text-primary-foreground ${
                      meeting.level === "Beginner"
                        ? "bg-green-500 hover:bg-green-500/70"
                        : meeting.level === "Intermediate"
                        ? "bg-yellow-400 hover:bg-yellow-400/70"
                        : "bg-red-500 hover:bg-red-500/70"
                    }`}
                  >
                    {meeting.level}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center">
                    <Calendar className="w-5 h-5 mr-2 text-muted" />
                    <span>{format(scheduledTime, "MMMM dd, yyyy")}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-5 h-5 mr-2 text-muted" />
                    <span>
                      {format(scheduledTime, "hh:mm a")} - {format(addMinutes(scheduledTime, meeting.duration), "hh:mm a")}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Users className="w-5 h-5 mr-2 text-muted" />
                    <span>
                      {meeting.attendees.length}/{meeting.maxAttendees} attendees
                    </span>
                  </div>
                  <div className="flex items-center">
                    <User className="w-5 h-5 mr-2 text-muted" />
                    <span>{meeting.mentor.firstName}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div className="text-sm text-muted">{meeting.maxAttendees - meeting.attendees.length} spots left</div>

                  {role === "Mentor" ? (
                    <div className="flex gap-2">
                      <Button variant="destructive" onClick={() => console.log("Cancel Meeting", meeting.id)}>
                        Cancel Meeting
                      </Button>
                      <Button
                        onClick={() => handleStartMeeting(meeting.id)}
                        disabled={minutesToStart > 10}
                      >
                        {minutesToStart > 10 ? `Starts in ${hours}h ${minutes}m` : "Start Meeting"}
                      </Button>
                    </div>
                  ) : (
                    !meeting.attendees.some((attendee: any) => attendee.id === userId) ? (
                      <Button onClick={() => handleRegister(meeting.id)}>Register</Button>
                    ) : (
                      <Button
                        onClick={() => console.log("Join Meeting", meeting.id)}
                        disabled={!meetingStarted || !meeting.attendees.some((attendee: any) => attendee.id === userId)}
                      >
                        {meeting.isStarted ? "Join Meeting" : "Not Started Yet"}
                      </Button>
                    )
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default MeetingsSection;
