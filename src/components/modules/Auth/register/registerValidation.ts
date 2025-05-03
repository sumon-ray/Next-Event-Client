import { z } from "zod";

export const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  passwordConfirm: z.string(),
  phoneNumber: z.string().min(10, "Phone number required"),
  gender: z.string().optional(),
  occupation: z.string().optional(),
  profileImage: z.string().url("Must be a valid URL").optional(),
  address: z.string().optional(),
  bio: z.string().optional(),
  file: z
    .instanceof(File)
    .refine((file) => file instanceof File, { message: "Invalid file" })
    .optional(),
});
