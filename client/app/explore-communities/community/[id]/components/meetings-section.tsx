import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Calendar, Clock, User, Users } from 'lucide-react'
import React, { useState } from 'react'

const dummyMeetings = [
    {
      id: 1,
      title: "Introduction to React Hooks",
      description: "Learn the basics of React Hooks and how they can simplify your React components.",
      date: "2023-06-15",
      time: "18:00",
      duration: "1.5 hours",
      attendees: 45,
      maxAttendees: 50,
      speaker: "Jane Doe",
      speakerTitle: "Senior React Developer",
      skillLevel: "Beginner",
      tags: ["React", "Hooks", "Frontend"],
    },
    {
      id: 2,
      title: "Advanced CSS Techniques",
      description: "Dive deep into advanced CSS techniques including CSS Grid, Flexbox, and CSS animations.",
      date: "2023-06-22",
      time: "19:00",
      duration: "2 hours",
      attendees: 32,
      maxAttendees: 40,
      speaker: "John Smith",
      speakerTitle: "CSS Guru",
      skillLevel: "Intermediate",
      tags: ["CSS", "Web Design", "Animations"],
    },
    {
      id: 3,
      title: "Building RESTful APIs with Node.js",
      description: "Learn how to create robust and scalable RESTful APIs using Node.js and Express.",
      date: "2023-06-29",
      time: "18:30",
      duration: "2.5 hours",
      attendees: 28,
      maxAttendees: 35,
      speaker: "Alice Johnson",
      speakerTitle: "Backend Developer",
      skillLevel: "Advanced",
      tags: ["Node.js", "API", "Backend"],
    },
]


const MeetingsSection = () => {

    const [registeredMeetings, setRegisteredMeetings] = useState<number[]>([])
    const handleRegister = (meetingId: number) => {
        setRegisteredMeetings((prev) => [...prev, meetingId])
    }

  return (
    <Card className='bg-foreground text-primary-foreground border-none'>
        <CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-6">Upcoming Meetings</h2>
            <div className="space-y-8">
              {dummyMeetings.map((meeting) => (
                <div key={meeting.id} className="bg-popover rounded-lg p-6 shadow-sm">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl text-primary-foreground font-semibold mb-2">{meeting.title}</h3>
                      <p className="text-muted mb-4">{meeting.description}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {meeting.tags.map((tag) => (
                          <Badge key={tag} className='bg-primary/30'>
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <Badge
                        className={`
                            "text-primary-foreground"
                            ${meeting.skillLevel === "Beginner"
                            ? "bg-green-500 hover:bg-green-500/70"
                            : meeting.skillLevel === "Intermediate"
                            ? "bg-yellow-400 hover:bg-yellow-400/70"
                            : "bg-red-500 hover:bg-red-500/70"}
                        `}
                    >
                        {meeting.skillLevel}
                    </Badge>

                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center">
                      <Calendar className="w-5 h-5 mr-2 text-muted" />
                      <span>{meeting.date}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-5 h-5 mr-2 text-muted" />
                      <span>
                        {meeting.time} ({meeting.duration})
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Users className="w-5 h-5 mr-2 text-muted" />
                      <span>
                        {meeting.attendees}/{meeting.maxAttendees} attendees
                      </span>
                    </div>
                    <div className="flex items-center">
                      <User className="w-5 h-5 mr-2 text-muted" />
                      <span>
                        {meeting.speaker} ({meeting.speakerTitle})
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-muted">{meeting.maxAttendees - meeting.attendees} spots left</div>
                    <Button
                      onClick={() => handleRegister(meeting.id)}
                      disabled={registeredMeetings.includes(meeting.id) || meeting.attendees >= meeting.maxAttendees}
                    >
                      {registeredMeetings.includes(meeting.id)
                        ? "Registered"
                        : meeting.attendees >= meeting.maxAttendees
                          ? "Full"
                          : "Register"}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
    </Card>
  )
}

export default MeetingsSection