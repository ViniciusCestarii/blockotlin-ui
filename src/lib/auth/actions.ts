import { cookies } from 'next/headers'
import { verifyToken } from './fetch'

export const getAccount = async () => {
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
