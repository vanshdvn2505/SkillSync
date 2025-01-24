import { Card, CardContent, CardHeader, CardTitle } from "./ui/card-ui";
import { Calendar } from "./ui/calendar";
import { Button } from "./ui/button";

const upcomingMeetings = [
  { title: "Team Standup", time: "10:00 AM" },
  { title: "Project Review", time: "2:00 PM" },
  { title: "Client Meeting", time: "4:30 PM" },
];

export function RightSidebar() {
  return (
    <aside className="w-80 pl-4">
      <div className="sticky top-20">
        <Card className="mb-4">
          <CardHeader>
            {/* <CardTitle>Calendar</CardTitle> */}
          </CardHeader>
          <CardContent>
            <Calendar />
          </CardContent>
        </Card>
        <Card className="shadow-lg ">
          <CardHeader>
            <CardTitle>Upcoming Meetings</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {upcomingMeetings.map((meeting, index) => (
                <>
                  <div className="flex flex-col space-y-2">
                  <div className="shadow-md px-4 py-2 rounded-md">
                    <li key={index} className="flex justify-between text-sm">
                      <span>{meeting.title}</span>
                      <span className="text-muted-foreground">
                        {meeting.time}
                      </span>
                    </li>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-sm text-muted-foreground">Community one</span>
                      <button className="bg-purple-200 py-2 px-2 rounded-lg text-sm">
                        Join Now
                      </button>
                    </div>
                  </div>
                  </div>
                </>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </aside>
  );
}
