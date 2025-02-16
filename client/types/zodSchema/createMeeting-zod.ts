import { z } from "zod";

export const meetingSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters"),
    description: z.string().optional(),
    scheduledAt: z.string().min(1, "Please select a date and time"),
    duration: z.number().min(15, "Duration must be at least 15 minutes"),
    maxAttendees: z.number().min(10, "Must allow at least 1 attendee"),
    tags: z.array(z.string()).max(5, "Maximum 5 tags allowed"),
});