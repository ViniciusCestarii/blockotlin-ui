import Logo from '@/components/system/logo'
import React from 'react'
import MainNav from '@/components/system/page-nav'
import MainHeader from '@/components/system/page-header'

const Navbar = () => {
  return (
    <MainHeader className="flex items-center">
      <Logo heading />
      <MainNav className="ml-auto" />
    </MainHeader>
  )
}

export default Navbar
