import React, { ReactNode, createContext, useReducer, useContext } from 'react'
import {
  searchBySurah,
  searchByArClean,
  searchByThDaasee,
} from '@/stores/QuranStore/ayahList'
import type { SearchResult } from '@/stores/QuranStore/ayahList'
import _surahList from '@/stores/QuranStore/surahList.json'
import { Surah } from '@/types/surah'

const surahList = _surahList as Surah[]
export interface State {
  surahList: Surah[]
  previousQuery: string
  query: string
  result: SearchResult
}

export interface Action {
  type: 'SEARCH_BY_SURAH' | 'SEARCH_BY_ARCLEAN' | 'SEARCH_BY_THDAASEE'
  query: string
  page?: number
  perPage?: number
}

const initialState: State = {
  surahList,
  previousQuery: '',
  query: '',
  result: {
    items: [],
    meta: {
      page: 1,
      perPage: 20,
      pageCount: 0,
      totalCount: 0,
    },
  },
}

const StoreContext = createContext<{
  state: State
  dispatch: React.Dispatch<Action>
}>({ state: initialState, dispatch: () => undefined })

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SEARCH_BY_SURAH':
      const surahResult = searchBySurah(
        action.query,
        action.page,
        action.perPage,
      )
      return {
        ...state,
        previousQuery: state.query,
        query: action.query,
        result: surahResult,
      }

    case 'SEARCH_BY_ARCLEAN':
      const arCleanResult = searchByArClean(
        action.query,
        action.page,
        action.perPage,
      )
      return {
        ...state,
        previousQuery: state.query,
        query: action.query,
        result: arCleanResult,
      }

    case 'SEARCH_BY_THDAASEE':
      const thDaaseeResult = searchByThDaasee(
        action.query,
        action.page,
        action.perPage,
      )
      return {
        ...state,
        previousQuery: state.query,
        query: action.query,
        result: thDaaseeResult,
      }

    default:
      return state
  }
}

type QuranStoreProviderType = { children: ReactNode }

export const QuranStoreProvider: React.FC<QuranStoreProviderType> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  )
}

export const useQuranStore = () => useContext(StoreContext)
