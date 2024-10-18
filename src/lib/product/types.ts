import { z } from 'zod'
import { createProductSchema } from './schema'

export type Product = {
  id: number
  name: string
  price: number
  description: string
  image: string
  category: string
}

export type CreateProduct = Omit<Product, 'id'>

export type ProductListResponse = {
  products: Product[]
}

export type CreateProductFormType = z.infer<typeof createProductSchema>
