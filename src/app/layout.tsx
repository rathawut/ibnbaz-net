import './globals.css'
import type { Metadata } from 'next'
import ThemeRegistry from '@/components/ThemeRegistry/ThemeRegistry'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Image from 'next/image'
import { Box } from '@mui/material'
import { Analytics } from '@vercel/analytics/react'

export const metadata: Metadata = {
  title: 'Ibn Baz Institute',
  description: 'สถาบันอิบนุบาซเพื่ออิสลามศึกษา',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry>
          <AppBar position="fixed" sx={{ zIndex: 2000 }}>
            <a href="/" className="ibnbaz-home-link">
              <Toolbar sx={{ backgroundColor: 'background.paper' }}>
                <Image
                  src="/logo-no-text.jpg"
                  width={44}
                  height={44}
                  alt="Ibn Baz Logo"
                />
                <Typography
                  variant="h6"
                  noWrap
                  component="div"
                  color="black"
                  sx={{ ml: 2 }}
                >
                  สถาบันอิบนุบาซเพื่ออิสลามศึกษา
                </Typography>
              </Toolbar>
            </a>
          </AppBar>
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              bgcolor: 'background.default',
              mt: ['48px', '56px', '64px'],
              p: 3,
            }}
          >
            {children}
          </Box>
        </ThemeRegistry>
        <Analytics />
      </body>
    </html>
  )
}
