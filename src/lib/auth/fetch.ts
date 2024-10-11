import { Authenticate, Account, CreateAccount } from './types'

export const login = async (
  auth: Authenticate,
): Promise<Account | undefined> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/public-api/v1/authentication/login`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(auth),
      },
    )

    if (!response.ok) {
      throw new Error(`Login failed: ${response.statusText}`)
    }

    const account: Account = await response.json()
    return account
  } catch (error) {
    console.error('Login error:', error)
  }
}

export const signup = async (
  account: CreateAccount,
): Promise<Account | undefined> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/public-api/v1/authentication/signup`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(account),
      },
    )

    if (!response.ok) {
      throw new Error(`Signup failed: ${response.statusText}`)
    }

    const newAccount: Account = await response.json()
    return newAccount
  } catch (error) {
    console.error('Signup error:', error)
  }
}

export const verifyToken = async (): Promise<Account | undefined> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/authentication/user-info`,
    )

    if (!response.ok) {
      throw new Error(`Token verification failed: ${response.statusText}`)
    }

    const account: Account = await response.json()
    return account
  } catch (error) {
    console.error('Token verification error:', error)
  }
}

export const logout = async (): Promise<void> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/authentication/logout`,
      {
        method: 'POST',
      },
    )

    if (!response.ok) {
      throw new Error(`Logout failed: ${response.statusText}`)
    }
  } catch (error) {
    console.error('Logout error:', error)
  }
}
