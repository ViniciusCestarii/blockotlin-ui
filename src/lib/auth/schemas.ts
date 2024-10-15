import { z } from 'zod'

// Regex for dd-mm-yyyy format
const birthDateSchema = z
  .string()
  .min(10, 'Data de nascimento é obrigatória')
  .regex(
    /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/,
    'Data de nascimento deve estar no formato aaaa-mm-dd',
  )

export const passwordRequirements = [
  { regex: /.{8,}/, text: 'Pelo menos 8 caracteres' },
  { regex: /[0-9]/, text: 'Pelo menos 1 número' },
  { regex: /[a-z]/, text: 'Pelo menos 1 letra minúscula' },
  { regex: /[A-Z]/, text: 'Pelo menos 1 letra maiúsucla' },
]

const passwordSchema = z
  .string()
  .regex(/.{8,}/, 'Senha deve conter pelo menos 8 caracteres')
  .regex(/[0-9]/, 'Senha deve conter pelo menos 1 número')
  .regex(/[a-z]/, 'Senha deve conter pelo menos 1 letra minúscula')
  .regex(/[A-Z]/, 'Senha deve conter pelo menos 1 letra maiúscula')

const emailSchema = z.string().email('Email inválido')

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
})

export const signupSchema = z
  .object({
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string(),
    birthDate: birthDateSchema,
    firstName: z.string().min(2, 'Nome deve ter no mínimo 2 caracteres'),
    lastName: z.string().min(2, 'Sobrenome deve ter no mínimo 2 caracteres'),
  })
  .refine((data) => data.confirmPassword === data.password, {
    path: ['confirmPassword'],
    message: 'Senhas devem ser iguais',
  })
