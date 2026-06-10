import type { Metadata } from 'next'
import { Providers } from './providers'
import './globals.css'

export const metadata: Metadata = {
  title: 'CiCi · Handwoven Jewelry from Taiwan',
  description: 'Handwoven jewelry crafted by artisans in Taiwan. Bracelets, earrings, and made-to-order pieces.',
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
