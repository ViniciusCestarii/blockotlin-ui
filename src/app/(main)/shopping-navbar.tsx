import Logo from '@/components/system/logo'
import React, { Suspense } from 'react'
import MainNav from '@/components/system/page-nav'
import MainHeader from '@/components/system/page-header'
import SearchProduct from './search-product'

const ShoppingNavbar = () => {
  return (
    <MainHeader className="flex flex-col sm:flex-row h-36 sm:h-14 sm:items-center gap-2 sm:gap-4">
      <Logo className="flex-shrink-0 w-fit sm:w-auto pt-2 sm:pt-0" />
      <Suspense
        fallback={
          <div className="flex-1 bg-primary rounded-md h-10 max-w-lg" />
        }
      >
        <SearchProduct className="flex-1 max-w-lg" />
      </Suspense>
      <MainNav className="ml-auto flex-shrink-0" />
    </MainHeader>
  )
}

export default ShoppingNavbar
