import { z } from 'zod'

const passwordSchema = z.string().min(8)

export const loginSchema = z.object({
  email: z.string().email(),
  password: passwordSchema,
})

export const signupSchema = z
  .object({
    email: z.string().email(),
    password: passwordSchema,
    confirmPassword: passwordSchema,
    firstName: z.string(),
    lastName: z.string(),
  })
  .refine(({ confirmPassword, password }) => {
    if (confirmPassword !== password) {
      return { confirmPassword: 'The passwords did not match' }
    }
  })
