import type { Metadata } from 'next'
import './globals.css'
import { Roboto } from 'next/font/google'
import { AuthProvider } from '@/context/auth-context'
import { Toaster } from '@/components/ui/sonner'
import { getAccount } from '@/lib/auth/actions'

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
  const account = await getAccount()
  return (
    <html lang="en" suppressHydrationWarning>
      <AuthProvider account={account}>
        <body
          className={`${roboto.variable} antialiased dark font-roboto overflow-x-hidden`}
        >
          {children}
        </body>
        <Toaster />
      </AuthProvider>
    </html>
  )
}
