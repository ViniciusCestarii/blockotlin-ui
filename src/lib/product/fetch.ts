'use server'

import { Product, ProductListResponse } from './types'
import React from 'react'
export const fetchProducts = React.cache(async (search?: string) => {
  try {
    const url = new URL(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/public-api/v1/product`,
    )

    if (search) {
      url.searchParams.append('name', search)
    }

    const response = await fetch(url.toString())

    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.statusText}`)
    }

    const data: ProductListResponse = await response.json()
    return data.products
  } catch (error) {
    console.error('Fetch error:', error)
  }
})

export const fetchProduct = React.cache(async (id: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/public-api/v1/product/${id}`,
    )

    if (!response.ok) {
      throw new Error(`Error fetching product: ${response.statusText}`)
    }

    const product: Product = await response.json()

    return product
  } catch (error) {
    console.error('Error fetching product:', error)
  }
})
