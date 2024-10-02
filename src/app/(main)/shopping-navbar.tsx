import Logo from '@/components/system/logo'
import React, { Suspense } from 'react'
import MainNav from '@/components/system/page-nav'
import MainHeader from '@/components/system/page-header'
import SearchProduct from './search-product'

const ShoppingNavbar = () => {
  return (
    <MainHeader className="flex items-center gap-4">
      <Logo className="flex-shrink-0" />
      <Suspense
        fallback={<div className="flex-1 bg-primary rounded-md h-10" />}
      >
        <SearchProduct className="flex-1 max-w-lg" />
      </Suspense>
      <MainNav className="ml-auto flex-shrink-0" />
    </MainHeader>
  )
}

export default ShoppingNavbar
