'use client'

import { Input } from '@/components/ui/input'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import React from 'react'

interface SearchProductProps extends React.HTMLAttributes<HTMLFormElement> {}

const SearchProduct = (props: SearchProductProps) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [search, setSearch] = React.useState(searchParams.get('search') ?? '')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const trimmedSearch = search.trim()

    if (!trimmedSearch) {
      router.push(pathname, { scroll: false })
      return
    }

    if (trimmedSearch === searchParams.get('search')) {
      return
    }

    router.push(`${pathname}?search=${trimmedSearch}`, { scroll: false })
  }

  return (
    <form {...props} onSubmit={handleSubmit}>
      <label htmlFor="search" className="sr-only">
        Search for products
      </label>
      <Input
        id="search"
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search for products"
        className="w-full bg-primary text-background placeholder:text-background/80"
      />
    </form>
  )
}

export default SearchProduct
