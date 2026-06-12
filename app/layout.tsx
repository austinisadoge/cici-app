import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { Providers } from './providers'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://cicidailystudio.com'),
  title: {
    default: 'CiCi Daily Studio · Handmade in Taiwan',
    template: '%s · CiCi Daily Studio',
  },
  description:
    'Collecting the sceneries of life through weaving, needlework and paint. Handmade earrings, bracelets, necklaces and more, crafted in Taiwan.',
  openGraph: {
    siteName: 'CiCi Daily Studio',
    type: 'website',
    images: ['/images/hero-model-1.jpg'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-Hant">
      <body>
        <Providers>{children}</Providers>
        <Analytics />
      </body>
    </html>
  )
}
