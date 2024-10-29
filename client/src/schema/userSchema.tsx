import { z } from "zod";

export const UserSignupSchema = z.object({
  fullname: z.string().min(2, "Full Name is required"),
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  contact: z.string().min(10, "contact must be 10 digit").max(10),
});
export type SignupInputFields = z.infer<typeof UserSignupSchema>;

export const UserLoginSchema = z.object({
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
export type LoginInputFields = z.infer<typeof UserLoginSchema>;
