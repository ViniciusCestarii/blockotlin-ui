import { z } from 'zod'

export const createProductSchema = z.object({
  name: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
  price: z.coerce.string().min(0.01, 'Preço deve ser maior que 0'),
  category: z.string().min(3, 'Categoria deve ter no mínimo 3 caracteres'),
  description: z.string().min(10, 'Descrição deve ter no mínimo 10 caracteres'),
  image: z.string().min(1, 'Imagem é obrigatória'),
})
