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
        <Card className="mb-4 bg-foreground py-4 px-2 border-none shadow-primary shadow-sm ">
          <CardContent className="bg-foreground text-accent flex items-center justify-center">
            <Calendar />
          </CardContent>
        </Card>
        <Card className="shadow-lg bg-foreground border-none">
          <CardHeader>
            <CardTitle className="text-muted text-center">Upcoming Meetings</CardTitle>
          </CardHeader>
          <CardContent className="shadow-primary shadow-sm">
            <ul className="space-y-2">
              {upcomingMeetings.map((meeting, index) => (
                <>
                  <div className="flex flex-col space-y-5 shadow-sm">
                  <div className="shadow-md px-4 py-2 rounded-md">
                    <li key={index} className="flex justify-between text-sm">
                      <span className="text-accent">{meeting.title}</span>
                      <span className="text-muted-foreground">
                        {meeting.time}
                      </span>
                    </li>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-sm text-muted-foreground">Community one</span>
                      <Button className="bg-primary py-2 px-2 rounded-lg text-sm" >
                        Join Now
                      </Button>
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
