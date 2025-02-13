import { z } from "zod";

export const signupSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  gender: z.enum(["Male", "Female", "Other"], { required_error: "Gender is required" }),
  role: z.enum(["Mentor", "Learner"], { required_error: "Role is required" }),
});