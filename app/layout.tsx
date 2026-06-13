import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import Script from 'next/script'
import { Providers } from './providers'
import './globals.css'

const META_PIXEL_ID = '1326900252206422'

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
        <Script id="meta-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${META_PIXEL_ID}');
fbq('track', 'PageView');`}
        </Script>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
            alt=""
          />
        </noscript>
      </body>
    </html>
  )
}
