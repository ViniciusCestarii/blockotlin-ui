import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'

const Login = () => {
  return (
    <Button size="xs" variant="outline" asChild>
      <Link href="/login" className="capitalize">
        Log in
      </Link>
    </Button>
  )
}

export default Login
