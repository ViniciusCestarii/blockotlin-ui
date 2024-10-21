import 'server-only'

import { cookies } from 'next/headers'
import { verifyToken } from './fetch'
import jwt from 'jsonwebtoken'
import { Account } from './types'

export const validateAccountToken = async () => {
  const cookie = cookies().get('token')

  if (!cookie) {
    return null
  }
  const response = await verifyToken(cookie.value)

  if (response.kind === 'error') {
    return null
  }

  const account = response.result.data

  return account
}

export const getAccount = (): Account | null => {
  const cookie = cookies().get('token')

  if (!cookie) {
    return null
  }

  const decoded = jwt.decode(cookie.value) as Account | null

  if (!decoded) {
    return null
  }

  return decoded
}
