export type Product = {
  id: number
  name: string
  price: number
  description: string
  image: string
  category: string
}

export type CreateProduct = Omit<Product, 'id' | 'description'> & {
  description?: string
}

export type StringfiedCreateProduct = Omit<CreateProduct, 'price'> & {
  price: string
}

export type ProductListResponse = {
  products: Product[]
}
