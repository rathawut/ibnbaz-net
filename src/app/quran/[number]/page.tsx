'use client'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Container, Typography, Box } from '@mui/material'

type IbnBazSurahPageType = {
  params: {
    number: Number
  }
}

const IbnBazSurahPage: React.FC<IbnBazSurahPageType> = ({ params }) => {
  const { number } = params // grabbing the number parameter from the URL
  const [surah, setSurah] = useState<null | any>(null)

  useEffect(() => {
    if (number) {
      // Fetch surah data from an API or get it from local data file
      // Example:
      // fetch(`/api/surah/${number}`).then(...).catch(...);
      // For the sake of this example, we'll just set it manually:
      setSurah({
        number,
        thName: 'Example Surah Name', // Replace this with actual name from fetched data
      })
    }
  }, [number])

  if (!surah) {
    return <p>Loading...</p> // Show loading state while fetching data
  }

  return (
    <Container>
      <Box my={4}>
        <Typography variant="h4" gutterBottom sx={{ 
          display: 'flex',
          justifyContent: 'center',
        }}>
          ซูเราะฮ์ที่ {`${number}`}
        </Typography>
        {/* Additional Surah details, Ayahs, etc. could be displayed here */}
      </Box>
    </Container>
  )
}

export default IbnBazSurahPage
