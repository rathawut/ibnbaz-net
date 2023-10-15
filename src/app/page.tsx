'use client'
import React from 'react'
import { TextField, InputAdornment, IconButton, Box } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import IbnBazSurahList from '@/components/IbnBazQuran/IbnBazSurahList/IbnBazSurahList'
import styles from './page.module.css'

const Home: React.FC = () => {
  const [searchValue, setSearchValue] = React.useState('')
  const searchInputRef = React.useRef<HTMLInputElement>(null)

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value)
  }

  const handleSearchClick = () => {
    console.log('Searching for: ', searchValue)
    // TODO: Implement the search logic
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleSearchClick()
    }
  }

  React.useEffect(() => {
    searchInputRef.current?.focus()
  }, [])

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
          placeholder="Search..."
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
          sx={{ width: '100%', maxWidth: '600px', mt: 3 }}
        />
      </Box>
      <Box sx={{ mt: 4 }}>
        <IbnBazSurahList />
      </Box>
    </Box>
  )
}

export default Home
