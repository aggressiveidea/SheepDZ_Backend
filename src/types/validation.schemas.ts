import { z } from "zod"

export const sheepSchema = z.object({
  price: z.number().min(1, { message: "Price must be at least 1" }),
  race: z.string().min(1, "race is required").max(50, "word is too long"),
  
})

export const RegisterSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z
    .string()
    .min(8, "password must be at least 8 characters")
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, "Password must contain uppercase, lowercase, and number"),
  firstName: z.string().min(1, "First name is required").max(50, "First name too long"),
  lastName: z.string().min(1, "Last name is required").max(50, "Last name too long"),
  role: z.enum(["user", "admin"]).optional().default("user"),
})

export const LoginSchema = z.object({
  email: z.string().email("invalid email format"),
  password: z.string().min(1, "password is required"),
})
 

 export const  PointDeVenteschema= z.object({
  email: z.string().email("invalid email format"),
  password: z.string().min(1, "password is required"),
})