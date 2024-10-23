import { useState, useEffect } from 'react'

type RecommendationsReturnType = {
  q: string
  suggested_queries: {
    q: string
  }[]
}

const useRecommendations = (search: string) => {
  const [recommendations, setRecommendations] = useState<string[]>([])
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const controller = new AbortController()
    const { signal } = controller

    const fetchRecommendations = async () => {
      if (!search) {
        setRecommendations([])
        return
      }

      setLoading(true)
      try {
        const response = await fetch(
          `https://http2.mlstatic.com/resources/sites/MLB/autosuggest?showFilters=true&limit=6&api_version=2&q=${search}`,
          { signal },
        )

        if (!response.ok) {
          throw new Error(
            `Failed to fetch recommendations: ${response.statusText}`,
          )
        }

        const data = (await response.json()) as RecommendationsReturnType
        setRecommendations(
          data.suggested_queries.length > 0
            ? data.suggested_queries
                .map((query) => query.q)
                .filter((query, index, self) => self.indexOf(query) === index)
            : [],
        )
        setError(null)
      } catch (err) {
        const error = err as Error
        if (error.name !== 'AbortError') {
          setError(error.message)
          setRecommendations([])
        }
      } finally {
        setLoading(false)
      }
    }

    fetchRecommendations()

    return () => controller.abort()
  }, [search])

  return { recommendations, loading, error }
}

export default useRecommendations
