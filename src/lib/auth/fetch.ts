import apiClient from '../axios'
import { handleErrors } from '../shared/error-handling'
import { Authenticate, Account, CreateAccount } from './types'

export const login = async (auth: Authenticate) =>
  handleErrors(
    apiClient.post<undefined>('/public-api/v1/authentication/login', auth),
  )

export const signup = async (createAccount: CreateAccount) =>
  handleErrors(
    apiClient.post<undefined>(
      '/public-api/v1/authentication/signup',
      createAccount,
    ),
  )

export const verifyToken = async (token?: string) =>
  handleErrors(
    apiClient.get<Account>('/api/v1/authentication/user-info', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  )

export const logout = async () =>
  handleErrors(apiClient.post<undefined>('/api/v1/authentication/logout'))
