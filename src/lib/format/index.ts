import { Account } from '../auth/types'

export const formatPrice = (price: number) => {
  return price.toLocaleString('pt', {
    style: 'currency',
    currency: 'BRL',
  })
}

export const formatUserName = (user: Account) => {
  return user.firstName + ' ' + user.lastName
}

export const formatUserInitials = (user: Account) => {
  return user.firstName.charAt(0) + user.lastName.charAt(0)
}

export const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('pt-BR')
}
