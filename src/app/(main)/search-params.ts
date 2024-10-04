import { createSearchParamsCache, parseAsString } from 'nuqs/server'

export const searchParamsParsers = {
  search: parseAsString.withDefault('').withOptions({
    shallow: false,
    scroll: true,
  }),
}

export const searchParamsCache = createSearchParamsCache(searchParamsParsers)
