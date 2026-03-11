import type {Metadata, Viewport} from 'next'
import {Inter} from 'next/font/google'
import './globals.css'
import TopBanner from '../components/layout/TopBanner'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-inter',
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  title: 'HMI Medical',
  description: 'HMI Medical - Your Trusted Healthcare Partner in Singapore',
  openGraph: {
    title: 'HMI Medical',
    description: 'Your Trusted Healthcare Partner in Singapore',
    type: 'website',
    locale: 'en_SG',
    siteName: 'HMI Medical',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HMI Medical',
    description: 'Your Trusted Healthcare Partner in Singapore',
  },
  robots: {
    index: true,
    follow: true,
  },
}

interface RootLayoutProps {
  readonly children: React.ReactNode
}

export default function RootLayout({children}: RootLayoutProps) {
  return (
    <html lang="en" className={`overflow-x-hidden ${inter.variable}`}>
      <body className="min-h-screen overflow-x-hidden bg-white font-sans text-hmi-gray-900 antialiased">
        <TopBanner />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
