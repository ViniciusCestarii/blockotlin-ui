'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import axios from 'axios'
import { Search } from 'lucide-react'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

type RecommendationsReturnType = {
  q: string
  suggested_queries: {
    q: string
  }[]
}

interface SearchProductProps extends React.HTMLAttributes<HTMLFormElement> {}

const SearchProduct = ({ className, ...props }: SearchProductProps) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [search, setSearch] = React.useState(searchParams.get('search') ?? '')
  const [recommendations, setRecommendations] = React.useState<string[]>([])

  console.log(recommendations)

  // todo use https://ui.shadcn.com/docs/components/combobox to show recommendations

  useEffect(() => {
    const fetchRecommendations = async () => {
      if (!search) setRecommendations([])
      try {
        const response = await axios.get<RecommendationsReturnType>(
          `https://http2.mlstatic.com/resources/sites/MLB/autosuggest?showFilters=true&limit=6&api_version=2&q=${search}`,
        )
        setRecommendations(
          response.data.suggested_queries.map((query) => query.q),
        )
      } catch (error) {
        console.error(error)
      }
    }

    fetchRecommendations()
  }, [search])

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
    <form
      {...props}
      onSubmit={handleSubmit}
      className={cn(
        'flex ring-offset-background focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 rounded-md',
        className,
      )}
    >
      <label htmlFor="search" className="sr-only">
        Search for products
      </label>
      <Input
        id="search"
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search for products"
        className="flex-1 bg-primary text-background placeholder:text-background/80 border-none rounded-r-none focus-visible:ring-0"
      />
      <Button type="submit" className="rounded-l-none">
        <span className="sr-only">Search</span>
        <Search className="size-5" />
      </Button>
    </form>
  )
}

export default SearchProduct
