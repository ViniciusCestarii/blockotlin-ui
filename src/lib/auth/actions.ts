import apiClient from '../axios'
import { Authenticate, Account, CreateAccount } from './types'

export const login = async (
  auth: Authenticate,
): Promise<Account | undefined> => {
  try {
    const response = await apiClient.post<Account>(
      '/public-api/v1/authentication/login',
      auth,
    )

    return response.data
  } catch (error) {}
}

export const signup = async (
  createAccount: CreateAccount,
): Promise<Account | undefined> => {
  try {
    const response = await apiClient.post(
      '/public-api/v1/authentication/signup',
      createAccount,
    )

    return response.data
  } catch (error) {}
}

export const verifyToken = async (): Promise<Account | undefined> => {
  try {
    const response = await apiClient<Account>(
      '/api/v1/authentication/user-info',
    )

    return response.data
  } catch (error) {}
}

export const logout = async (): Promise<void> => {
  try {
    await apiClient.post('/api/v1/authentication/logout')
  } catch (error) {}
}
