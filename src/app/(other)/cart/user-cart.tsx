'use client'
import { useAuth } from '@/context/auth-context'
import React from 'react'
import ShopCart from './shop-cart'
import { Card, CardHeader } from '@/components/ui/card'
import { ShoppingBasket, User } from 'lucide-react'
import Link from 'next/link'

const UserCart = () => {
  const { auth } = useAuth()

  if (!auth) {
    return (
      <div className="space-y-6">
        <Card className="max-w-xl mx-auto">
          <CardHeader>
            <h3 className="text-center">
              Você precisa estar logado para ver o seu carrinho de compras
            </h3>
            <ShoppingBasket className="mx-auto size-12 md:size-24" />
          </CardHeader>
        </Card>
        <p className="max-w-xl mx-auto px-2 py-2">
          <User className="inline" />{' '}
          <Link className="font-semibold underline" href="/signup">
            Registre-se
          </Link>{' '}
          ou faça{' '}
          <Link className="font-semibold underline" href="/signup">
            login
          </Link>{' '}
          para aproveitar as nossas ofertas exclusivas
        </p>
      </div>
    )
  }

  return <ShopCart />
}

export default UserCart
