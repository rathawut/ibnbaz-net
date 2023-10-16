'use client'
import React from 'react'
import { TextField, InputAdornment, IconButton, Box } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
// import IbnBazSurahList from '@/components/IbnBazQuran/IbnBazSurahList/IbnBazSurahList'
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

  const handleSearchClick = (dispatch: React.Dispatch<any>) => {
    const isArabic = /[\u0600-\u06FF]/.test(searchValue)

    if (isArabic) {
      dispatch({ type: 'SEARCH_BY_ARCLEAN', query: searchValue })
    } else {
      dispatch({ type: 'SEARCH_BY_THDAASEE', query: searchValue })
    }

    searchInputRef.current?.blur()
  }

  const handleKeyDown = (
    event: React.KeyboardEvent,
    dispatch: React.Dispatch<any>,
  ) => {
    if (event.key === 'Enter') {
      handleSearchClick(dispatch)
    }
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
        handleSearchClick={handleSearchClick}
        handleKeyDown={handleKeyDown}
      />
    </QuranStoreProvider>
  )
}

const HomeContent: React.FC<{
  searchValue: string
  setSearchValue: React.Dispatch<React.SetStateAction<string>>
  searchInputRef: React.RefObject<HTMLInputElement>
  handleSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  handleSearchClick: (dispatch: React.Dispatch<any>) => void
  handleKeyDown: (
    event: React.KeyboardEvent,
    dispatch: React.Dispatch<any>,
  ) => void
}> = ({
  searchValue,
  setSearchValue,
  searchInputRef,
  handleSearchChange,
  handleSearchClick,
  handleKeyDown,
}) => {
  const { state, dispatch } = useQuranStore()

  return (
    <Box>
      <Box display="flex" justifyContent="center">
        <TextField
          fullWidth
          variant="outlined"
          size="medium"
          value={searchValue}
          onChange={handleSearchChange}
          onKeyDown={(event) => handleKeyDown(event, dispatch)}
          placeholder="ค้นหาจากอัลกุรอาน..."
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => handleSearchClick(dispatch)}>
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
