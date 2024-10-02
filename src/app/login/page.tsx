import React, { Suspense } from 'react'
import ClientLoginPage from './client-page'

const LoginPag = () => {
  return (
    <Suspense>
      <ClientLoginPage />
    </Suspense>
  )
}

export default LoginPag
