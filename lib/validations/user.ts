import * as z from "zod";

export const UserValidation = z.object({
    profile_photo: z.string().url().nonempty(),
    name: z.string().min(3).max(30),
    username: z.string().min(3).max(30),
    height: z.string().min(0).max(300),
    weight: z.string().min(0).max(500),
    bio: z.string().min(3).max(1000)
})