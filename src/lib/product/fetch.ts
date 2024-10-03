import axios from 'axios'
import { Product } from './types'
import React from 'react'

export const fetchProducts = React.cache(async (search?: string) => {
  try {
    // change to apiClient to use the correct api
    // the fakestoreapi.com doesn't have a search endpoint
    const response = await axios.get<Product[]>(
      'https://fakestoreapi.com/products',
      {
        params: { q: search },
      },
    )
    if (!search) return response.data

    return response.data.filter((product) =>
      product.title.toLowerCase().includes(search.toLowerCase()),
    )
  } catch (error) {
    console.error('Login error:', error)
  }
})

export const fetchProduct = React.cache(async (id: string) => {
  try {
    // change to apiClient to use the correct api
    // the fakestoreapi.com doesn't have a search endpoint
    const response = await axios.get<Product>(
      `https://fakestoreapi.com/products/${id}`,
    )

    return response.data
  } catch (error) {
    console.error('Login error:', error)
  }
})
