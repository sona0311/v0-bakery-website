import type { Metadata } from 'next'
import { Noto_Sans_JP, Zen_Maru_Gothic } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  variable: '--font-noto-sans-jp',
  weight: ['400', '500', '700'],
})

const zenMaruGothic = Zen_Maru_Gothic({
  subsets: ['latin'],
  variable: '--font-zen-maru',
  weight: ['400', '500', '700'],
})

export const metadata: Metadata = {
  title: 'ぱんのいえ | 毎日焼きたて、手作りパン',
  description: '心を込めて毎日焼き上げる手作りパンのお店「ぱんのいえ」。クロワッサン、あんぱん、メロンパンなど、素材にこだわった美味しいパンをお届けします。',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja" className="bg-background">
      <body className={`${notoSansJP.variable} ${zenMaruGothic.variable} font-sans antialiased`}>
        <Header />
        <main>{children}</main>
        <Footer />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
