import type { Metadata } from 'next'
import './globals.css'
import { Roboto } from 'next/font/google'
import { AuthProvider } from '@/context/auth-context'

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

const roboto = Roboto({
  subsets: ['latin'],
  display: 'swap',
  weight: ['300', '400', '500', '700', '900'],
  variable: '--font-roboto',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <AuthProvider>
        <body
          className={`${roboto.variable} antialiased dark font-roboto overflow-x-hidden`}
        >
          {children}
        </body>
      </AuthProvider>
    </html>
  )
}
