import _ayahList from './ayahList.json'
import type { Ayah } from '@/types/ayah'
import type { Meta } from '@/types/meta'

export interface SearchResult {
  items: Ayah[]
  meta: Meta
}

const ayahList = _ayahList as Ayah[]

export const searchByField = (
  field: 'surah' | 'arClean' | 'thDaasee',
  query: string,
  page: number = 1,
  perPage: number = 20,
  exactSearch: boolean = false,
): SearchResult => {
  const startIndex = (page - 1) * perPage
  const endIndex = startIndex + perPage

  const allItems = ayahList.filter((ayah) => {
    return exactSearch
      ? String(ayah[field]) === String(query)
      : String(ayah[field]).includes(String(query))
  })

  const items = allItems.slice(startIndex, endIndex)

  return {
    items,
    meta: {
      page,
      perPage,
      pageCount: Math.ceil(allItems.length / perPage),
      totalCount: allItems.length,
    },
  }
}

export const searchBySurah = (
  query: string,
  page?: number,
  perPage?: number,
): SearchResult => {
  return searchByField('surah', query, page, perPage, true)
}

export const searchByArClean = (
  query: string,
  page?: number,
  perPage?: number,
): SearchResult => {
  return searchByField('arClean', query, page, perPage)
}

export const searchByThDaasee = (
  query: string,
  page?: number,
  perPage?: number,
): SearchResult => {
  return searchByField('thDaasee', query, page, perPage)
}
