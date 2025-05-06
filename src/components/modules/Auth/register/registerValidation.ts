import * as z from "zod";

export const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  passwordConfirm: z.string(),
  phoneNumber: z.string().min(11, "Phone number is required"),
  gender: z.enum(["Male", "Female", "Other"]).or(z.literal("")),
  occupation: z.string().min(1, "Occupation is required"),
  address: z.string().min(1, "Address is required"),
  bio: z.string().optional(),
  file: z.any().optional(),
}).refine((data) => data.password === data.passwordConfirm, {
  message: "Passwords do not match",
  path: ["passwordConfirm"],
});

