'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useAuth } from '@/context/auth-context'
import { addProductToCart } from '@/lib/product/fetch'
import { ShoppingBasket } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

interface AddToCartButtonProps {
  productId: number
}

const AddToCartButton = (props: AddToCartButtonProps) => {
  const { auth } = useAuth()

  if (!auth) {
    return <UnauthenticatedAddToCartButton {...props} />
  }

  if (auth.role === 'ADMIN') {
    return <AdminAddToCartButton />
  }

  return <ClientAddToCartButton {...props} />
}

const ClientAddToCartButton = (props: AddToCartButtonProps) => {
  const router = useRouter()
  const handleButtonClick = async () => {
    const response = await addProductToCart({
      ...props,
      quantity: 1,
    })

    if (response.kind === 'error') {
      toast.error('Erro ao adicionar produto ao carrinho')
      return
    }
    toast.success('Produto adicionado ao carrinho')
    router.push('/cart')
  }
  return <Button onClick={handleButtonClick}>Adicionar ao carrinho</Button>
}

const UnauthenticatedAddToCartButton = ({
  productId,
}: AddToCartButtonProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Adicionar ao carrinho</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Entre para adicionar produtos</DialogTitle>
          <DialogDescription>
            Para adicionar produtos ao carrinho, você precisa estar logado.
          </DialogDescription>
        </DialogHeader>
        <ShoppingBasket className="mx-auto size-12 md:size-24" />
        <Button asChild>
          <Link href={`/login?next=/product/${productId}`}>Entrar</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href={`/signup?next=/product/${productId}`}>Criar conta</Link>
        </Button>
      </DialogContent>
    </Dialog>
  )
}

const AdminAddToCartButton = () => {
  return (
    <Button className="flex flex-col">
      Adicionar ao carrinho
      <span className="text-xs">(desativado para administradores)</span>
    </Button>
  )
}

export default AddToCartButton
