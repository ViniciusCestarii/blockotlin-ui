import apiClient from '../axios'
import { handleErrors } from '../shared/error-handling'
import { CreateProduct, Product, ProductListResponse } from './types'
import React from 'react'
export const fetchProducts = React.cache(async (search?: string) => {
  try {
    const response = await apiClient<ProductListResponse>(
      '/public-api/v1/product',
      {
        params: {
          name: search,
        },
      },
    )

    return response.data.products
  } catch (error) {}
})

export const fetchProduct = React.cache(async (id: string) => {
  try {
    const response = await apiClient<Product>(`/public-api/v1/product/${id}`)

    return response.data
  } catch (error) {}
})

export const createProduct = async (product: CreateProduct) =>
  handleErrors(
    apiClient.post<Product>('/api/v1/product/create-product', product),
  )
