import 'server-only'

import { cookies, headers } from 'next/headers'
import { edgeVerifyToken } from './fetch'
import { decodeJwt } from 'jose'
import { Account } from './types'

export const validateAccountToken = async () => {
  const cookie = cookies().get('token')

  if (!cookie) {
    return null
  }
  const response = await edgeVerifyToken(cookie.value)

  if (response.kind === 'error') {
    return null
  }

  const account = response.result

  return account
}

export const getAccount = (): Account | null => {
  const cookie = cookies().get('token')

  if (!cookie) {
    return null
  }

  const isInvalid = Boolean(headers().get('Invalid-Auth'))

  if (isInvalid) {
    return null
  }

  const decoded = decodeJwt(cookie.value) as Account | null

  if (!decoded) {
    return null
  }

  return decoded
}
