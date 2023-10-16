'use client'
import React from 'react'
import { TextField, InputAdornment, IconButton, Box } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import IbnBazAyahList from '@/components/IbnBazQuran/IbnBazAyahList/IbnBazAyahList'
import {
  useQuranStore,
  QuranStoreProvider,
} from '@/stores/QuranStore/QuranStore'

const Home: React.FC = () => {
  const [searchValue, setSearchValue] = React.useState('')
  const searchInputRef = React.useRef<HTMLInputElement>(null)

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value)
  }

  React.useEffect(() => {
    searchInputRef.current?.focus()
  }, [])

  return (
    <QuranStoreProvider>
      <HomeContent
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        searchInputRef={searchInputRef}
        handleSearchChange={handleSearchChange}
      />
    </QuranStoreProvider>
  )
}

const HomeContent: React.FC<{
  searchValue: string
  setSearchValue: React.Dispatch<React.SetStateAction<string>>
  searchInputRef: React.RefObject<HTMLInputElement>
  handleSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}> = ({ searchValue, setSearchValue, searchInputRef, handleSearchChange }) => {
  const { dispatch } = useQuranStore()

  const handleSearch = React.useCallback(
    (query: string, page: number = 1) => {
      const isArabic = /[\u0600-\u06FF]/.test(query)
      if (isArabic) {
        dispatch({ type: 'SEARCH_BY_ARCLEAN', query, page })
      } else {
        dispatch({ type: 'SEARCH_BY_THDAASEE', query, page })
      }
    },
    [dispatch], // dispatch is a dependency for this useCallback
  )

  const handleSearchClick = () => {
    handleSearch(searchValue)
    window?.history.pushState(null, '', `?q=${searchValue}`)
    searchInputRef.current?.blur()
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleSearchClick()
    }
  }

  React.useEffect(() => {
    const params = new URLSearchParams(window?.location.search)
    const query = params.get('q')
    const page = Number(params.get('page') || 1) // Extract page value

    if (query) {
      setSearchValue(query)
      handleSearch(query, page) // Pass page value to handleSearch
    }
  }, [handleSearch, setSearchValue])

  return (
    <Box>
      <Box display="flex" justifyContent="center">
        <TextField
          fullWidth
          variant="outlined"
          size="medium"
          value={searchValue}
          onChange={handleSearchChange}
          onKeyDown={handleKeyDown}
          placeholder="ค้นหาจากอัลกุรอาน..."
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleSearchClick}>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
          inputRef={searchInputRef}
          sx={{ width: '100%', maxWidth: '600px' }}
        />
      </Box>
      <Box>
        <IbnBazAyahList />
      </Box>
    </Box>
  )
}

export default Home
