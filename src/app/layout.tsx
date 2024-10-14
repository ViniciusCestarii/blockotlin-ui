import type { Metadata } from 'next'
import './globals.css'
import { Roboto } from 'next/font/google'
import { AuthProvider } from '@/context/auth-context'
import { cookies } from 'next/headers'
import { verifyToken } from '@/lib/auth/fetch'

export const metadata: Metadata = {
  title: 'Blockotlin',
  description: 'Loja online Blockotlin possui os melhores produtos para você.',
}

const roboto = Roboto({
  subsets: ['latin'],
  display: 'swap',
  weight: ['300', '400', '500', '700', '900'],
  variable: '--font-roboto',
})

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const cookie = cookies().get('token')

  let account = null
  if (cookie) {
    account = await verifyToken(cookie.value)
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <AuthProvider account={account}>
        <body
          className={`${roboto.variable} antialiased dark font-roboto overflow-x-hidden`}
        >
          {children}
        </body>
      </AuthProvider>
    </html>
  )
}
