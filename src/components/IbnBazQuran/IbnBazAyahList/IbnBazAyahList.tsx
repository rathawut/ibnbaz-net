import React from 'react'
import {
  Box,
  Typography,
  Pagination,
  Table,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
} from '@mui/material'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import { useQuranStore } from '@/stores/QuranStore/QuranStore'
import type { Ayah } from '@/types/ayah'
import type { Surah } from '@/types/surah'

const highlightText = (text: string, highlight: string) => {
  const parts = text.split(new RegExp(`(${highlight})`, 'gi'))
  return (
    <>
      {parts.map((part, index) =>
        part.toLowerCase() === highlight.toLowerCase() ? (
          <span key={String(index)} style={{ backgroundColor: 'yellow' }}>
            {part}
          </span>
        ) : (
          <span key={String(index)}>{part}</span>
        ),
      )}
    </>
  )
}

const IbnBazAyahList: React.FC = () => {
  const { state, dispatch } = useQuranStore()
  const [currentPage, setCurrentPage] = React.useState<number>(() => {
    if (typeof window === 'undefined') {
      return 1
    }
    // Extract the page number from URL parameters when the component mounts
    const params = new URLSearchParams(window.location.search)
    return Number(params.get('page') || 1)
  })

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setCurrentPage(value)

    // Update the URL's query string with the new page number
    const currentSearch = new URLSearchParams(window.location.search)
    currentSearch.set('page', String(value))
    window.history.pushState(null, '', `?${currentSearch.toString()}`)

    // Dispatch the new page query
    const queryType = /[\u0600-\u06FF]/.test(state.query)
      ? 'SEARCH_BY_ARCLEAN'
      : 'SEARCH_BY_THDAASEE'
    dispatch({
      type: queryType,
      query: state.query,
      page: value,
    })
  }

  const isFirstRender = React.useRef(true)

  React.useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }

    if (state.previousQuery !== state.query) {
      setCurrentPage(1)
      if (typeof window !== 'undefined') {
        const currentSearch = new URLSearchParams(window.location.search)
        currentSearch.set('page', '1')
        window.history.pushState(null, '', `?${currentSearch.toString()}`)
      }
    }
  }, [state.previousQuery, state.query])

  React.useEffect(() => {
    // Load the content for the initial page based on the URL's query string
    const queryType = /[\u0600-\u06FF]/.test(state.query)
      ? 'SEARCH_BY_ARCLEAN'
      : 'SEARCH_BY_THDAASEE'
    dispatch({
      type: queryType,
      query: state.query,
      page: currentPage,
    })
  }, [dispatch, currentPage, state.query])

  const { items, meta } = state.result

  const getSurahName = (surahNumber: number): string => {
    const foundSurah = state.surahList.find(
      (s: Surah) => s.number === surahNumber,
    )
    return foundSurah ? foundSurah.thName : ''
  }

  const getDisplaySurahAndAyah = (ayah: Ayah) => {
    return `[ซูเราะฮ์${getSurahName(ayah.surah)} (${ayah.surah}) อายะฮ์ที่ ${
      ayah.ayah
    }]`
  }

  const handleCopyText = async (text: string) => {
    await navigator.clipboard.writeText(text)
  }

  const getCopyText = (ayah: Ayah) => {
    return `${ayah.ar}\n${ayah.thDaasee} ${getDisplaySurahAndAyah(ayah)}`
  }

  return (
    <Box
      p={3}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <Typography variant="body2" textAlign="center">
        ค้นหาเจอทั้งหมด: {meta.totalCount} อายะฮ์ | จำนวนหน้า: {meta.pageCount}
      </Typography>
      <Table>
        <TableBody>
          {items.map((ayah: Ayah, index: number) => (
            <TableRow key={index}>
              <TableCell align="center">
                <Typography variant="body1">{ayah.ar}</Typography>
                <Typography variant="body1">
                  {highlightText(ayah.thDaasee, state.query)}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {getDisplaySurahAndAyah(ayah)}
                  <IconButton
                    onClick={() => handleCopyText(getCopyText(ayah))}
                    size="small"
                    aria-label="copy"
                  >
                    <ContentCopyIcon fontSize="small" />
                  </IconButton>
                </Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Pagination
        count={meta.pageCount}
        page={currentPage}
        onChange={handlePageChange}
        sx={{ mt: 3 }}
      />

      <Typography variant="h5" mb={2} textAlign="center" sx={{ mt: 3 }}>
        อัลกุรอานพร้อมคำแปลภาษาไทย เครดิตจาก Daasee.com
      </Typography>
    </Box>
  )
}

export default IbnBazAyahList
