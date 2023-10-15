'use client'
import React from 'react'
import { TextField, InputAdornment, IconButton } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
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
    <div className={styles.container}>
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
        inputRef={searchInputRef} // Using the ref here
        sx={{ width: '100%', maxWidth: '600px', mt: 3 }}
      />
    </div>
  )
}

export default Home
