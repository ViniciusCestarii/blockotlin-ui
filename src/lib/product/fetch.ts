import apiClient from '../axios'
import { Product, ProductListResponse } from './types'
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
