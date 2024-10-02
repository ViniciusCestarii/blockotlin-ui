import React, { Suspense } from 'react'
import ClientLoginPage from './client-page'

const LoginPage = () => {
  return (
    <Suspense>
      <ClientLoginPage />
    </Suspense>
  )
}

export default LoginPage
