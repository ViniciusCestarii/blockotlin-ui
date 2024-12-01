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
import { Input, NewPasswordInput, PasswordInput } from '@/components/ui/input'
import { useAuth } from '@/context/auth-context'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import Link from 'next/link'
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
import { signupSchema } from '@/lib/auth/schemas'
import { signup, verifyToken } from '@/lib/auth/fetch'
import { toastError } from '@/lib/shared/error-handling'
import { SignupFormType } from '@/lib/auth/types'

const SignupPage = () => {
  const { updateAuth } = useAuth()

  const searchParams = useSearchParams()
  const router = useRouter()

  const [isPending, startTransition] = useTransition()

  const form = useForm<SignupFormType>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
      birthDate: '',
    },
  })

  const onSubmit = async (values: SignupFormType) => {
    startTransition(async () => {
      const { confirmPassword: _, ...signupValues } = values // Exclude confirmPassword
      const response = await signup(signupValues)

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
          <CardTitle className="text-2xl font-bold">Criar conta</CardTitle>
          <CardDescription>
            Crie sua conta para comprar na nossa loja
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Primeiro nome</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="John"
                          {...field}
                          autoComplete="given-name"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sobrenome</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Doe"
                          {...field}
                          autoComplete="family-name"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="birthDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Data de nascimento</FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        {...field}
                        autoComplete="bday"
                        placeholder="dd/mm/aaaa"
                        max={new Date().toISOString().split('T')[0]}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
                      <NewPasswordInput
                        {...field}
                        autoComplete="new-password"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirmar senha</FormLabel>
                    <FormControl>
                      <PasswordInput {...field} autoComplete="new-password" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isPending}>
                Criar conta
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="text-center text-sm text-muted-foreground">
          Já possui uma conta?
          <Link
            href="/login"
            className="font-medium underline hover:text-primary ml-1"
            prefetch={false}
          >
            Entre!
          </Link>
        </CardFooter>
      </Card>
    </main>
  )
}

export default SignupPage
