import type { Metadata } from 'next'
import { Providers } from './providers'
import './globals.css'

export const metadata: Metadata = {
  title: 'CiCi Daily Jewelry · Handmade in Taiwan',
  description:
    'Collecting the sceneries of life through weaving, needlework and paint. Handmade earrings, bracelets, necklaces and more, crafted in Taiwan.',
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
