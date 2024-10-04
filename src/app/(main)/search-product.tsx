'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/style/utils'
import axios from 'axios'
import { Search, SearchX } from 'lucide-react'
import React, { useEffect, useRef } from 'react'
import { useQueryState } from 'nuqs'
import { searchParamsParsers } from './search-params'

type RecommendationsReturnType = {
  q: string
  suggested_queries: {
    q: string
  }[]
}

interface SearchProductProps extends React.HTMLAttributes<HTMLFormElement> {}

const SearchProduct = ({ className, ...props }: SearchProductProps) => {
  const [nuqsSearch, setNuqsSearch] = useQueryState(
    'search',
    searchParamsParsers.search,
  )
  const [search, setSearch] = React.useState(nuqsSearch)
  const [isInputOnFocus, setIsInputOnFocus] = React.useState(false)
  const [recommendations, setRecommendations] = React.useState<string[]>([])

  const inputRef = useRef<HTMLInputElement>(null)
  const submitRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const fetchRecommendations = async () => {
      if (!search) setRecommendations([])
      try {
        const response = await axios.get<RecommendationsReturnType>(
          `https://http2.mlstatic.com/resources/sites/MLB/autosuggest?showFilters=true&limit=6&api_version=2&q=${search}`,
        )
        setRecommendations(
          response.data.suggested_queries.length > 0
            ? response.data.suggested_queries
                .map((query) => query.q)
                .filter((query, index, self) => self.indexOf(query) === index)
            : [],
        )
      } catch (error) {
        console.error(error)
      }
    }

    fetchRecommendations()
  }, [search])

  const updateSearchParam = (search: string) => {
    const trimmedSearch = search.trim()

    if (!trimmedSearch) {
      setNuqsSearch(null)
      return
    }

    setNuqsSearch(trimmedSearch)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    submitRef.current?.blur()
    updateSearchParam(search)
  }

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      updateSearchParam(search)
      setIsInputOnFocus(false)

      inputRef.current?.blur()
    }
  }

  return (
    <form
      {...props}
      onSubmit={handleSubmit}
      onFocus={() => setIsInputOnFocus(true)}
      onBlur={() => setIsInputOnFocus(false)}
      className={cn(
        'flex ring-offset-background focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 rounded-md',
        className,
      )}
    >
      <label htmlFor="search" className="sr-only">
        Procurar produtos
      </label>

      <div className="flex-1 flex relative">
        <Input
          id="search"
          ref={inputRef}
          onKeyDown={handleInputKeyDown}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Procurar produtos"
          className="flex-1 bg-primary text-background placeholder:text-background/80 border-none rounded-r-none focus-visible:ring-0"
        />
        {search && (
          <ul
            className={cn(
              'absolute z-10 top-[calc(100%-0.25rem)] left-0 w-[calc(100%+0.5rem)] -ml-[0.25rem] bg-background border-2 border-ring border-t-0 rounded-b-md text-sm opacity-0 pointer-events-none',
              isInputOnFocus && 'opacity-100 pointer-events-auto',
            )}
          >
            {recommendations.length === 0 && (
              <li className="py-3 px-4">
                <SearchX className="inline size-5 mr-2 flex-shrink-0" /> Nenhum
                resultado encontrado
              </li>
            )}
            {recommendations.map((recommendation) => (
              <li key={recommendation} className="p-1 w-full">
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start h-fit py-2"
                  aria-label={`procurar por "${recommendation}"`}
                  onClick={() => {
                    setSearch(recommendation)
                    setIsInputOnFocus(false)
                    updateSearchParam(recommendation)
                  }}
                >
                  <Search className="inline size-5 mr-2 flex-shrink-0" />
                  {recommendation}
                </Button>
              </li>
            ))}
          </ul>
        )}
        <Button
          ref={submitRef}
          type="submit"
          className="rounded-l-none"
          aria-label="procurar"
        >
          <Search className="size-5" />
        </Button>
      </div>
    </form>
  )
}

export default SearchProduct
