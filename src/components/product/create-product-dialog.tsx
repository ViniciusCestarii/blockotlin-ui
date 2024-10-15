'use client'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { createProductSchema } from '@/lib/product/schema'
import { StringfiedCreateProduct } from '@/lib/product/types'
import { toastError } from '@/lib/shared/error-handling'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'
import { Textarea } from '../ui/textarea'
import { createProduct } from '@/lib/product/fetch'

const defaultValues: StringfiedCreateProduct = {
  description: '',
  image: '',
  name: '',
  category: '',
  price: '0',
}

const CreateProductDialog = () => {
  const [open, setOpen] = useState(false)
  const [isPending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof createProductSchema>>({
    resolver: zodResolver(createProductSchema),
    defaultValues,
  })

  const closeDialog = () => {
    setOpen(false)
    form.reset(defaultValues)
  }

  const onSubmit = async (values: z.infer<typeof createProductSchema>) => {
    startTransition(async () => {
      const response = await createProduct({
        ...values,
        price: Number(values.price),
      })

      if (response.kind === 'error') {
        toastError(response.err)
        return
      }

      closeDialog()
    })
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => (open ? setOpen(open) : closeDialog())}
    >
      <DialogTrigger asChild>
        <Button variant="outline">Criar novo produto</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Criar Produto</DialogTitle>
          <DialogDescription>
            Preencha os campos abaixo para criar um novo produto.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Geladeira Frost Free"
                      {...field}
                      autoComplete="name"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preço</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="1500"
                      {...field}
                      autoComplete="price"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Mantenha seus alimentos frescos e organizados com a Geladeira Frost Free 450L, ideal para quem busca praticidade, tecnologia e elegância em um único produto."
                      {...field}
                      autoComplete="description"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categoria</FormLabel>
                  <FormControl>
                    <Input placeholder="eletrodoméstico" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Imagem</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://example.com/image.jpg"
                      {...field}
                      autoComplete="image"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isPending}>
              Criar produto
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default CreateProductDialog
