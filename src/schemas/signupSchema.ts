import {z} from "zod";

export const usernameValidation = z
    .string()
    .min(4, "Username must be atleat 4 characters long")
    .max(20, "Username must not exceed 20 characters")
    .regex(/^[a-zA-Z0-9_]+$/, "Usernsme must not follow special character")

export const signupSchema = z.object({
    username: usernameValidation,
    email: z.string().email({message: "Invalid email address"}),
    password: z.string().min(6, {message: "Password must be atleat 6 characters long"}).max(20, {message: "Password must not exceed 20 characters"}),
})