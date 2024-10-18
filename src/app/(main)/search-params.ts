import { createSearchParamsCache, parseAsString } from 'nuqs/server'

export const searchParamsParsers = {
  search: parseAsString.withDefault('').withOptions({
    shallow: false,
    history: 'push',
    scroll: true,
  }),
}

export const searchParamsCache = createSearchParamsCache(searchParamsParsers)
