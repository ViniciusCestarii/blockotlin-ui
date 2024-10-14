import apiClient from '../axios'
import { Authenticate, Account, CreateAccount } from './types'

// todo: handle errors
// show feedback to the user using a toast

export const login = async (auth: Authenticate): Promise<void> => {
  try {
    await apiClient.post<Account>('/public-api/v1/authentication/login', auth)
  } catch (error) {}
}

export const signup = async (createAccount: CreateAccount): Promise<void> => {
  try {
    await apiClient.post('/public-api/v1/authentication/signup', createAccount)
  } catch (error) {}
}

export const verifyToken = async (
  token?: string,
): Promise<Account | undefined> => {
  try {
    const response = await apiClient.get<Account>(
      '/api/v1/authentication/user-info',
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )

    return response.data
  } catch (error) {}
}

export const logout = async (): Promise<void> => {
  try {
    await apiClient.post('/api/v1/authentication/logout')
  } catch (error) {}
}
