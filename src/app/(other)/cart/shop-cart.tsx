'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Separator } from '@/components/ui/separator'
import { MinusIcon, PlusIcon, TrashIcon } from 'lucide-react'
import React, { useState } from 'react'

const ShopCart = () => {
  const [cart, setCart] = useState([
    {
      id: 1,
      name: 'Camiseta Básica',
      image: '/placeholder.svg',
      quantity: 2,
      price: 29.99,
    },
    {
      id: 2,
      name: 'Calça Jeans',
      image: '/placeholder.svg',
      quantity: 1,
      price: 59.99,
    },
    {
      id: 3,
      name: 'Tênis Esportivo',
      image: '/placeholder.svg',
      quantity: 1,
      price: 79.99,
    },
  ])
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
  const handleQuantityChange = (id: number, quantity: number) => {
    setCart(cart.map((item) => (item.id === id ? { ...item, quantity } : item)))
  }
  const handleRemoveItem = (id: number) => {
    setCart(cart.filter((item) => item.id !== id))
  }

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0)
  const totalWithDiscount = total - total * (discount / 100)
  return (
    <div className="grid md:grid-cols-[1fr_320px] gap-8">
      <div className="grid gap-4">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-4 bg-muted/20 rounded-lg p-4"
          >
            <img
              src="/placeholder.svg"
              alt={item.name}
              width={80}
              height={80}
              className="rounded-md object-cover"
              style={{ aspectRatio: '80/80', objectFit: 'cover' }}
            />
            <div className="flex-1 grid gap-1">
              <h3 className="font-medium">{item.name}</h3>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() =>
                    handleQuantityChange(item.id, item.quantity - 1)
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
                    handleQuantityChange(item.id, item.quantity + 1)
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
        <Button size="lg" className="w-full">
          Finalizar Compra
        </Button>
      </div>
    </div>
  )
}

export default ShopCart
