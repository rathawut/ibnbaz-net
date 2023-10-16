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
    // Extract the page number from URL parameters when the component mounts
    const params = new URLSearchParams(window?.location.search)
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

  React.useEffect(() => {
    setCurrentPage(1)
    const currentSearch = new URLSearchParams(window?.location.search)
    currentSearch.set('page', '1')
    window?.history.pushState(null, '', `?${currentSearch.toString()}`)
  }, [state.query])

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

  const handleCopyText = async (text: string) => {
    await navigator.clipboard.writeText(text)
  }

  return (
    <Box
      p={3}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      {state.query ? (
        <Typography variant="body2" textAlign="center">
          ค้นหาเจอทั้งหมด: {meta.totalCount} อายะฮ์ | จำนวนหน้า:{' '}
          {meta.pageCount}
        </Typography>
      ) : (
        <Typography variant="h5" textAlign="center">
          กรุณาพิมพ์คำค้นหาที่ต้องการ ด้วยภาษาอาหรับหรือไทย
        </Typography>
      )}

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
                  ({getSurahName(ayah.surah)} อายะฮ์ที่ {ayah.ayah}){' '}
                  <IconButton
                    onClick={() =>
                      handleCopyText(
                        `${ayah.ar}\n${ayah.thDaasee}\n(${getSurahName(
                          ayah.surah,
                        )} อายะฮ์ที่ ${ayah.ayah})`,
                      )
                    }
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
