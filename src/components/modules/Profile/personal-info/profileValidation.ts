import { z } from "zod";
const isClient = typeof window !== 'undefined';
export const profileValidationSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  phoneNumber: z
    .string()
    .min(1, "Phone number is required")
    .regex(/^01[3-9]\d{8}$/, "Please enter a valid phone number (01xxxxxxxxx)"),
  address: z.string().min(1, "Address is required"),
  occupation: z.string().min(1, "Occupation is required"),
  bio: z.string(),
  profileImage: isClient ? z.instanceof(FileList).optional().or(z.any()) : z.any(),
});

export type FormValues = z.infer<typeof profileValidationSchema>;
