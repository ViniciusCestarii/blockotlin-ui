import React from 'react'
import Footer from '../footer'
import ShoppingNavbar from './shopping-navbar'

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <ShoppingNavbar />
      <div className="flex flex-col min-h-screen-minus-header">{children}</div>
      <Footer />
    </>
  )
}
