export const formatPrice = (price: number) => {
  return price.toLocaleString('pt', {
    style: 'currency',
    currency: 'BRL',
  })
}
