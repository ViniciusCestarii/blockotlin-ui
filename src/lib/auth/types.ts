export type Authenticate = {
  email: string
  password: string
}

export type Account = {
  id: number
  email: string
  name: string
  role: string
  avatar?: string
}
