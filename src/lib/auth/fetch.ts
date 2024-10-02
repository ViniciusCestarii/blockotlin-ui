import apiClient from '../axios'
import { Authenticate, Account } from './types'

export const login = async (
  auth: Authenticate,
): Promise<Account | undefined> => {
  try {
    const response = await apiClient.post('/login', auth)
    return response.data
  } catch (error) {
    console.error('Login error:', error)
  }
}

export const verifyToken = async (): Promise<Account | undefined> => {
  try {
    const response = await apiClient.post('/verify-token')
    return response.data
  } catch (error) {
    console.error('Token verification error:', error)
  }
}

export const logout = async (): Promise<void> => {
  try {
    await apiClient.post('/logout')
  } catch (error) {
    console.error('Logout error:', error)
  }
}
