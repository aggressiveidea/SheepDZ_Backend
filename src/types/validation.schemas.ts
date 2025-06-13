import { z } from "zod"


export const RegisterSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z
    .string()
    .min(8, "password must be at least 8 characters")
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, "Password must contain uppercase, lowercase, and number"),
  firstName: z.string().min(1, "First name is required").max(50, "First name too long"),
  lastName: z.string().min(1, "Last name is required").max(50, "Last name too long"),
  role: z.enum(["user", "admin"]).optional().default("user"),
  num_nat: z.number(),
  receiptUrl: z.string().url(),
})

export const LoginSchema = z.object({
  email: z.string().email("invalid email format"),
  password: z.string().min(1, "password is required"),
})
 
export const sheepValidationSchema = z.object({
  price: z.number(),
  race: z.string().trim().min(1),
  origin: z.string().trim().min(1),
  weight: z.number(),
  age: z.number(),
  imageUrl: z.string().url(),
});
export const pointDeVenteValidationSchema = z.object({
  weather: z.string().min(1),
  location: z.string().trim().min(1),
  name: z.string().trim().min(1),
});
export const RDVValidationSchema = z.object({
  clientId: z.string().min(1, "Client ID is required"),
  pointDeVenteId: z.string().optional(),
  date: z.coerce.date({
    required_error: "Date is required",
    invalid_type_error: "Invalid date format",
  }),
  status: z.enum(["pending", "confirmed", "cancelled", "completed"]).optional(),
  reason: z.string().max(500, "Reason too long").optional(),
  notes: z.string().max(1000, "Notes too long").optional(),
  reminderSent: z.boolean().optional(),
});