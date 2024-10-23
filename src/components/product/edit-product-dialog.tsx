'use client'

import { Button, ButtonProps } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { updateProduct } from '@/lib/product/fetch'
import { updateProductSchema } from '@/lib/product/schema'
import { Product, UpdateProductFormType } from '@/lib/product/types'
import { toastError } from '@/lib/shared/error-handling'
import { transformImgToBase64URL } from '@/lib/utils/img'
import { zodResolver } from '@hookform/resolvers/zod'
import { ImageUp } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'
import ImageInput from '../ui/image-input'
import { Textarea } from '../ui/textarea'
import AdminOnly from '../system/admin-only'
import { toast } from 'sonner'

interface EditProductDialogProps {
  product: Product
  buttonProps?: ButtonProps
}

const EditProductDialogBase = ({
  product,
  buttonProps,
}: EditProductDialogProps) => {
  const [open, setOpen] = useState(false)
  const [isPending, startTransition] = useTransition()

  const fakeFileImage = [{ image: product.image, size: 10 }]

  const defaultValues: UpdateProductFormType = {
    image: fakeFileImage,
    price: String(product.price),
    name: product.name,
    description: product.description,
  }

  const router = useRouter()

  const form = useForm<UpdateProductFormType>({
    resolver: zodResolver(updateProductSchema),
    defaultValues,
  })

  useEffect(() => {
    // ensure the form is reset when the dialog opens
    // without this the form would keep the previous values when opening a updated product
    if (open) {
      form.reset(defaultValues)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  const onSubmit = async (values: UpdateProductFormType) => {
    startTransition(async () => {
      const { image, ...rest } = values
      if (!image) {
        return
      }

      // obs: this is a simplification
      // the correct way would be to send all the data and the image to the server via form data
      // there the server would treat the image and save it to the cloud
      // then save the product with the image url

      const base64Image =
        image[0]?.image ?? (await transformImgToBase64URL(image))

      if (!base64Image) {
        return
      }

      const updatedProduct = {
        ...rest,
        id: product.id,
        price: Number(values.price),
        image: base64Image,
      }

      const response = await updateProduct(updatedProduct)

      if (response.kind === 'error') {
        toastError(response.err)
        return
      }

      toast.success('Produto atualizado com sucesso!')

      setOpen(false)
      router.refresh()
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          aria-label={`Editar produto ${product.name}`}
          {...buttonProps}
        >
          {buttonProps?.children ?? 'Editar produto'}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Editar Produto</DialogTitle>
          <DialogDescription>
            Modifique os campos abaixo para editar o produto.
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
                      step="0.01"
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
              name="image"
              render={({ field }) => (
                <FormItem>
                  <Button asChild className="w-full">
                    <FormLabel>
                      Selecionar imagem <ImageUp className="size-4 ml-1" />
                    </FormLabel>
                  </Button>
                  <FormControl>
                    <ImageInput
                      {...field}
                      defaultValue={fakeFileImage[0].image}
                      value={form.getValues('image')[0]?.filename}
                      onChange={(e) => {
                        if (!e.target.files) {
                          form.setValue('image', fakeFileImage)
                          return
                        }
                        form.setValue('image', e.target.files)
                      }}
                    />
                  </FormControl>
                  <FormDescription>
                    Selecione uma imagem para o produto.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isPending}>
              Editar produto
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

const EditProductDialog = (props: EditProductDialogProps) => {
  return (
    <AdminOnly>
      <EditProductDialogBase {...props} />
    </AdminOnly>
  )
}

export default EditProductDialog
