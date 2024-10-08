import { z } from 'zod'

// Regex for dd-mm-yyyy format
const birthDateSchema = z
  .string()
  .min(10, 'Data de nascimento é obrigatória')
  .regex(
    /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/,
    'Data de nascimento deve estar no formato aaaa-mm-dd',
  )

const passwordSchema = z
  .string()
  .min(8, 'Senha deve ter no mínimo 8 caracteres')

const emailSchema = z.string().email('Email inválido')

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
})

export const signupSchema = z
  .object({
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: passwordSchema,
    birthDate: birthDateSchema,
    firstName: z.string().min(2, 'Nome deve ter no mínimo 2 caracteres'),
    lastName: z.string().min(2, 'Sobrenome deve ter no mínimo 2 caracteres'),
  })
  .refine((data) => data.confirmPassword === data.password, {
    path: ['confirmPassword'],
    message: 'Senhas não estão iguais',
  })
