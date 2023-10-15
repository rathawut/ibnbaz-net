import React from 'react'
import {
  Box,
  Typography,
  Pagination,
  Table,
  TableBody,
  TableRow,
  TableCell,
} from '@mui/material'
import { useQuranStore } from '@/stores/QuranStore/QuranStore'
import type { Ayah } from '@/types/ayah'
import type { Surah } from '@/types/surah'

const ITEMS_PER_PAGE = 20

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
  const [currentPage, setCurrentPage] = React.useState(1)

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setCurrentPage(value)

    // Dispatch the new page query
    const queryType = /[\u0600-\u06FF]/.test(state.query)
      ? 'SEARCH_BY_ARCLEAN'
      : 'SEARCH_BY_THDAASEE'
    dispatch({
      type: queryType,
      query: state.query,
      page: value,
      perPage: ITEMS_PER_PAGE,
    })
  }

  const { items, meta } = state.result
  const pageCount = Math.ceil(meta.totalCount / ITEMS_PER_PAGE)

  const getSurahName = (surahNumber: number): string => {
    const foundSurah = state.surahList.find(
      (s: Surah) => s.number === surahNumber,
    )
    return foundSurah ? foundSurah.thName : ''
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
        <>
          <Typography variant="h4" mb={2} textAlign="center">
            อัลกุรอานพร้อมคำแปลภาษาไทย เครดิตจาก Daasee.com
          </Typography>
          <Typography variant="body2" mb={3} textAlign="center">
            ค้นหาเจอทั้งหมด {meta.totalCount} | จำนวนหน้า: {pageCount}
          </Typography>
        </>
      ) : (
        <Typography variant="h5" mb={3} textAlign="center">
          กรุณาพิมพ์คำค้นหาที่ต้องการ ด้วยภาษาอาหรับหรือไทย
        </Typography>
      )}

      <Table>
        <TableBody>
          {items.map((ayah: Ayah, index: number) => (
            <TableRow key={index}>
              <TableCell align="center">
                <Typography variant="h6">
                  {getSurahName(ayah.surah)} อายะฮ์ที่ {ayah.ayah}
                </Typography>
                <Typography variant="body1">
                  {highlightText(ayah.ar, state.query)}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {highlightText(ayah.thDaasee, state.query)}
                </Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Pagination
        count={pageCount}
        page={currentPage}
        onChange={handlePageChange}
        sx={{ mt: 3 }}
      />
    </Box>
  )
}

export default IbnBazAyahList
