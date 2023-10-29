'use client'
import React from 'react'
import { Grid, Typography, Container, Box } from '@mui/material'
import _surahList from './surahList.json'
import { useQuranStore } from '@/stores/QuranStore/QuranStore'
import { Surah } from '@/types/surah'

const surahList = _surahList as Surah[]

export const IbnBazSurahList: React.FC = () => {
  const { dispatch } = useQuranStore()

  const handleSurahClick = (number: number) => {
    dispatch({ type: 'SEARCH_BY_SURAH', query: number.toString() })
  }

  return (
    <Container>
      <Grid container spacing={2} columns={12}>
        {surahList.map((surah: Surah) => (
          <Grid item xs={6} sm={4} md={3} lg={2} key={surah.number}>
            <Box
              component="a"
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: 80,
                borderRadius: 1,
                boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                color: 'text.primary',
                backgroundColor: 'background.paper',
                textDecoration: 'none',
                p: 1,
                ':hover': {
                  textDecoration: 'none',
                  cursor: 'pointer',
                  boxShadow: '0px 8px 8px rgba(0, 0, 0, 0.25)',
                },
              }}
              onClick={() => handleSurahClick(surah.number)}
            >
              <Typography variant="body1" align="center">
                <div>
                  {surah.number}. {surah.thName}
                </div>
                <div>{surah.arName}</div>
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

export default IbnBazSurahList
