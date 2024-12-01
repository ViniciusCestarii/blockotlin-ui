'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { setProductCart, fetchUserCart } from '@/lib/product/fetch'
import { CartProduct } from '@/lib/product/types'
import { MinusIcon, PlusIcon, ShoppingCart, TrashIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'

// here it would be better to use react-query to handle the cart state

const ShopCart = () => {
  const [cart, setCart] = useState<CartProduct[]>([])
  const [isLoading, setIsLoading] = React.useState(true)

  const handleFinishPurchase = async () => {
    // for the sake of simplicity, we are not handling the actual purchase
    cart.forEach(async (item) => {
      await setProductCart({ productId: item.id, quantity: 0 })
    })
    setCart([])
    toast.success('Compra finalizada com sucesso!', {
      description:
        'Obrigado por comprar conosco! Seu pedido será entregue em breve',
    })
  }

  const changeProductQuantity = async (productId: number, quantity: number) => {
    const response = await setProductCart({ productId, quantity })

    if (response.kind === 'error') {
      toast.error('Erro ao atualizar a quantidade do produto')
      return
    }

    setCart(
      cart.flatMap((item) => {
        if (item.id === productId && quantity === 0) {
          return []
        }

        if (item.id === productId) {
          return { ...item, quantity }
        }

        return item
      }),
    )
  }

  useEffect(() => {
    const getUserCart = async () => {
      setIsLoading(true)
      const response = await fetchUserCart()

      if (response.kind === 'error') {
        // this page should have redirected on the middleware
        toast.error('Erro ao carregar informações do usuário')
        redirect('/login')
      }

      setCart(response.result.data.products)
      setIsLoading(false)
    }

    getUserCart()
  }, [])
  const [coupon, setCoupon] = useState('')
  const [discount, setDiscount] = useState(0)
  const handleCouponChange = (value: string) => {
    setCoupon(value)
    if (value === 'SAVE10') {
      setDiscount(10)
    } else {
      setDiscount(0)
    }
  }

  const handleRemoveItem = (id: number) => {
    changeProductQuantity(id, 0)
  }

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0)
  const totalWithDiscount = total - total * (discount / 100)
  return (
    <div className="grid md:grid-cols-[1fr_320px] gap-8">
      <div className="flex flex-col gap-4">
        {isLoading &&
          Array.from({ length: 1 }, (_, i) => (
            <Skeleton key={i} className="h-36" />
          ))}
        {cart.length === 0 && !isLoading && (
          <div className="flex flex-col md:flex-row items-center gap-4 bg-muted/20 rounded-lg p-4 md:max-h-36">
            <ShoppingCart className="size-32" />

            <div className="flex-col space-y-4 text-center md:text-start">
              <div className="text-lg font-semibold">
                Seu carrinho está vazio
              </div>
              <p className="text-center md:text-start">
                Sua sacola está vazia Vá para a{' '}
                <Link className="underline" href="/">
                  página inicial
                </Link>{' '}
                ou procure no site os produtos que vão te deixar feliz. Quando
                encontrá-los, clique no botão adicionar ao carrinho ;)
              </p>
            </div>
          </div>
        )}
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-4 bg-muted/20 rounded-lg p-4 h-36"
          >
            <Link href={`/product/${item.id}`}>
              <Image
                src={item.image}
                alt={item.name}
                width={80}
                height={80}
                className="rounded-md object-cover"
                style={{ aspectRatio: '80/80', objectFit: 'cover' }}
              />
            </Link>
            <div className="flex-1 grid gap-1">
              <h3 className="font-medium">
                <Link className="hover:underline" href={`/product/${item.id}`}>
                  {item.name}
                </Link>
              </h3>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() =>
                    changeProductQuantity(item.id, item.quantity - 1)
                  }
                  disabled={item.quantity <= 1}
                >
                  <MinusIcon className="h-4 w-4" />
                </Button>
                <span className="font-medium">{item.quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() =>
                    changeProductQuantity(item.id, item.quantity + 1)
                  }
                >
                  <PlusIcon className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium">${item.price.toFixed(2)}</span>
                <span className="font-medium">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground hover:bg-muted/50"
              onClick={() => handleRemoveItem(item.id)}
            >
              <TrashIcon className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
      <div className="grid gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Resumo do Pedido</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="flex items-center justify-between">
              <span>Subtotal</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Desconto</span>
              <span>-${(total * (discount / 100)).toFixed(2)}</span>
            </div>
            <Separator />
            <div className="flex items-center justify-between font-medium">
              <span>Total</span>
              <span>${totalWithDiscount.toFixed(2)}</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Cupom de Desconto</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2">
              <Input
                placeholder="Digite seu cupom"
                value={coupon}
                onChange={(e) =>
                  handleCouponChange(e.target.value.toUpperCase())
                }
              />
              {discount > 0 && (
                <div className="text-green-500 font-medium">
                  Desconto de {discount}% aplicado!
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Formas de Pagamento</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2">
              <RadioGroup defaultValue="credit-card">
                <Label
                  htmlFor="credit-card"
                  className="flex items-center gap-2 font-medium"
                >
                  <RadioGroupItem id="credit-card" value="credit-card" />
                  Cartão de Crédito
                </Label>
                <Label
                  htmlFor="pix"
                  className="flex items-center gap-2 font-medium"
                >
                  <RadioGroupItem id="pix" value="pix" />
                  PIX
                </Label>
                <Label
                  htmlFor="boleto"
                  className="flex items-center gap-2 font-medium"
                >
                  <RadioGroupItem id="boleto" value="boleto" />
                  Boleto
                </Label>
              </RadioGroup>
            </div>
          </CardContent>
        </Card>
        <Button
          disabled={cart.length === 0}
          onClick={handleFinishPurchase}
          size="lg"
          className="w-full"
        >
          Finalizar Compra
        </Button>
      </div>
    </div>
  )
}

export default ShopCart
