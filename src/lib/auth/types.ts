import { z } from 'zod'
import { loginSchema, signupSchema } from './schemas'

export type Authenticate = {
  email: string
  password: string
}

export type Account = {
  id: number
  email: string
  firstName: string
  lastName: string
  role: 'ADMIN' | 'CLIENT'
  birthDate: string
  avatar?: string
}

export type CreateAccount = Omit<Account, 'id' | 'role'> & {
  password: string
}

export type LoginFormType = z.infer<typeof loginSchema>

export type SignupFormType = z.infer<typeof signupSchema>
