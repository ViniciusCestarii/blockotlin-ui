'use client'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useAuth } from '@/context/auth-context'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import Link from 'next/link'
import { z } from 'zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { useRouter, useSearchParams } from 'next/navigation'
import { useTransition } from 'react'
import { loginSchema } from '@/lib/auth/schemas'
import { login, verifyToken } from '@/lib/auth/fetch'
import { toastError } from '@/lib/shared/error-handling'

const ClientLoginPage = () => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const { updateAuth } = useAuth()

  const [isPending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    startTransition(async () => {
      const response = await login(values)

      if (response.kind === 'error') {
        toastError(response.err)
        return
      }

      const responseToken = await verifyToken()

      if (responseToken.kind === 'ok') {
        updateAuth(responseToken.result.data)
        const next = searchParams.get('next')
        router.push(next ?? '/')
      }
    })
  }

  return (
    <main className="flex items-center w-full py-4 px-2 min-h-screen-minus-header justify-center sm:bg-gradient-to-br via-background from-background to-muted">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Entrar</CardTitle>
          <CardDescription>Acesse sua conta</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="johndoe@example.com"
                        {...field}
                        autoComplete="email"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        {...field}
                        autoComplete="current-password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isPending}>
                Entrar
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="text-center text-sm text-muted-foreground">
          Não possue uma conta?
          <Link
            href="/signup"
            className="font-medium underline hover:text-primary ml-1"
            prefetch={false}
          >
            Crie a sua agora!
          </Link>
        </CardFooter>
      </Card>
    </main>
  )
}

export default ClientLoginPage
