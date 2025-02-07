import { z } from "zod";

const MAX_FILE_SIZE = 5000000
export const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"]

export const communitySchema = z.object({
  name: z.string().min(1, "Required").max(50, "Community Length is Too Long"),
  description: z.string().max(500, "Description is Too Long").optional(),
  imageType: z.enum(["file", "url"]),
  profileImage: z.union([
    z.object({
      file: z
        .any()
        .refine((file) => file?.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
        .refine(
          (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
          "Only .jpg, .jpeg, .png and .webp formats are supported.",
        ),
    }),
    z.object({
      url: z.string().url("Invalid Image URL"),
    }),
  ]),
  skills: z.array(z.string().max(20, "Skill Length Is Too Long")).default([]),
})