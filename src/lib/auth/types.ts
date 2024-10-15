export type Authenticate = {
  email: string
  password: string
}

export type Account = {
  id: number
  email: string
  firstName: string
  lastName: string
  role: 'ADMIN' | 'CLIENT'
  birthDate: string
  avatar?: string
}

export type CreateAccount = Omit<Account, 'id' | 'role'> & {
  password: string
}
