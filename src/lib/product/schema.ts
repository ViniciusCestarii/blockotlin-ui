import { z } from 'zod'

const MAX_FILE_SIZE = 5 * 1024 * 1024

export const createProductSchema = z.object({
  name: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
  price: z.coerce.string().min(0.01, 'Preço deve ser maior que 0'),
  description: z.string().min(10, 'Descrição deve ter no mínimo 10 caracteres'),
  image: z
    .any()
    .refine((files) => files?.length === 1, 'Imagem deve ser fornecida.')
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      `Imagem deve ter tamanho menor que 5MB.`,
    ),
})

export const updateProductSchema = z.object({
  name: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
  price: z.coerce.string().min(0.01, 'Preço deve ser maior que 0'),
  description: z.string().min(10, 'Descrição deve ter no mínimo 10 caracteres'),
  image: z
    .any()
    .refine((files) => files?.length === 1, 'Imagem deve ser fornecida.')
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      `Imagem deve ter tamanho menor que 5MB.`,
    ),
})
