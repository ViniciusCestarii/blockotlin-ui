import apiClient from '../axios'
import { handleErrors } from '../shared/error-handling'
import {
  SetProductCart,
  CartProduct,
  CreateProduct,
  Product,
  ProductListResponse,
} from './types'
import React from 'react'

export const fetchProducts = React.cache(async (search?: string) => {
  const query = search ? `?name=${encodeURIComponent(search)}` : ''
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/public-api/v1/product${query}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      next: {
        revalidate: 0.5, // would be better to use revalidate using triggers like revalidateTag or revalidatePath
      },
    },
  )

  if (!response.ok) {
    throw new Error('Failed to fetch products')
  }

  const data: ProductListResponse = await response.json()
  return data.products
})

export const fetchProduct = React.cache(async (id: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/public-api/v1/product/${id}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      next: {
        revalidate: 0.5,
      },
    },
  )

  if (!response.ok) {
    throw new Error(`Failed to fetch product with ID ${id}`)
  }

  const data: Product = await response.json()
  return data
})

export const fetchUserCart = async () =>
  handleErrors(
    apiClient.get<{
      products: CartProduct[]
    }>(`/api/v1/cart/user`),
  )

export const createProduct = async (product: CreateProduct) =>
  handleErrors(
    apiClient.post<Product>('/api/v1/product/create-product', product),
  )

export const updateProduct = async ({ id, ...productRest }: Product) =>
  handleErrors(apiClient.put<Product>(`/api/v1/product/${id}`, productRest))

export const setProductCart = async (body: SetProductCart) =>
  handleErrors(apiClient.put(`/api/v1/cart/user`, body))
