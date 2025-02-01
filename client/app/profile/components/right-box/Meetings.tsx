import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, Users, Link2 } from 'lucide-react';
import React from 'react';

interface Meeting {
  id: string;
  title: string;
  date: string;
  communityName: string;
  time: { start: string; end: string };
  participants: number;
  status: "Upcoming" | "Live";
  meetingLink: string;
};

const meetings: Meeting[] = [
  {
    id: "1",
    title: "Project Kickoff",
    communityName: "React",
    date: "2025-02-05",
    time: { start: "10:00 AM", end: "11:00 AM" },
    participants: 5,
    status: "Upcoming",
    meetingLink: "https://meet.example.com/project-kickoff",
  },
  {
    id: "2",
    title: "Sprint Planning",
    communityName: "React",
    date: "2025-02-06",
    time: { start: "02:00 PM", end: "03:30 PM" },
    participants: 8,
    status: "Upcoming",
    meetingLink: "https://meet.example.com/sprint-planning",
  },
  {
    id: "3",
    title: "Weekly Standup",
    communityName: "React",
    date: "2025-02-07",
    time: { start: "09:30 AM", end: "10:00 AM" },
    participants: 10,
    status: "Live",
    meetingLink: "https://meet.example.com/weekly-standup",
  },
  {
    id: "4",
    title: "Client Demo",
    communityName: "React",
    date: "2025-02-08",
    time: { start: "04:00 PM", end: "05:00 PM" },
    participants: 3,
    status: "Upcoming",
    meetingLink: "https://meet.example.com/client-demo",
  },
];

const Meetings = () => {
  return (
    <div className="flex flex-col flex-grow w-full">
      {meetings.length > 0 ?
        (meetings.map((meet, index) => (
          <div
            key={index}
            className="flex justify-between items-center w-full text-primary-foreground p-5 my-3 bg-popover rounded-md"
          >
            <div className="flex justify-center items-center gap-4">
              <Avatar className="h-16 w-16 rounded-full">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="flex flex-col justify-start items-start">
                <p className="font-semibold">{meet.title}</p>
                <p className="text-sm text-muted">{meet.communityName}</p>
                <div className="w-full flex flex-wrap justify-start gap-4 mt-2">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted" />
                    <p>{meet.date}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted" />
                    <p>{meet.time.start} - {meet.time.end}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted" />
                    <p>{meet.participants} participants</p>
                  </div>
                </div>
              </div>
            </div>
            <div className='flex flex-col space-y-2'>
              <Button onClick={() => window.open(meet.meetingLink, "_blank")}>
                Join Meeting
              </Button>
              {/* <Button variant={"secondary"} onClick={() => window.open(meet.meetingLink, "_blank")}>
                View Details
              </Button> */}
            </div>
          </div>
        ))) : (
          <div className="flex items-center justify-center min-h-48">
            <p className="text-lg text-muted">No meetings scheduled</p>
          </div>
        )}
    </div>
  );
};

export default Meetings;
