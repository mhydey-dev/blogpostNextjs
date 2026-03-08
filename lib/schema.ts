import {z} from "zod"


export const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email( "Invalid email address"),
  password: z.string("Password must be a String").min(6,"Password must be at least 6 characters")
})


export const LoginSchema = z.object({
  email: z.string().email( "Invalid email address"),
  password: z.string().min(6,"Password must be at least 6 characters")
})

export type registerSchematype = z.infer<typeof registerSchema>
export type LoginSchemaType = z.infer<typeof LoginSchema>;