import React from 'react'
import Footer from '../footer'
import Navbar from './navbar'

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Navbar />
      <div className="flex flex-col min-h-screen-minus-header">{children}</div>
      <Footer />
    </>
  )
}
