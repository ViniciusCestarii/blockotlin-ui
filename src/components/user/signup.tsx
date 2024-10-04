import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'

const Signup = () => {
  return (
    <Button size="xs" asChild>
      <Link href="/signup" className="capitalize">
        Crie sua conta
      </Link>
    </Button>
  )
}

export default Signup
