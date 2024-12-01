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
import { ShoppingBasket } from 'lucide-react'
import Link from 'next/link'

interface AddToCartButtonProps {
  productId: string
}

const AddToCartButton = (props: AddToCartButtonProps) => {
  const { auth } = useAuth()

  if (!auth) {
    return <UnauthenticatedAddToCartButton {...props} />
  }

  if (auth.role === 'ADMIN') {
    return <AdminAddToCartButton />
  }

  return <AuthenticatedAddToCartButton />
}

const AuthenticatedAddToCartButton = () => {
  return <Button>Adicionar ao carrinho</Button>
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
