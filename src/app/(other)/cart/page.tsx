import MainContainer from '@/components/system/main-container'
import UserCart from './user-cart'
import TypographyH2 from '@/components/ui/typography-h2'

export default function CartPage() {
  return (
    <MainContainer>
      <TypographyH2 className="pb-6">Seu carrinho</TypographyH2>
      <UserCart />
    </MainContainer>
  )
}
