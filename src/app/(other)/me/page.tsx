'use client'

import MainContainer from '@/components/system/main-container'
import UserAvatar from '@/components/user/avatar'
import { verifyToken } from '@/lib/auth/fetch'
import { Account } from '@/lib/auth/types'
import { formatDate, formatUserName } from '@/lib/format'
import { redirect } from 'next/navigation'
import React, { useEffect } from 'react'
import { toast } from 'sonner'

const MePage = () => {
  const [account, setAccount] = React.useState<Account | null>(null)
  const [isPending, startTransition] = React.useTransition()

  useEffect(() => {
    const fetchAccount = async () => {
      startTransition(async () => {
        const response = await verifyToken()

        if (response.kind === 'error') {
          // this page should have redirected on the middleware
          toast.error('Erro ao carregar informações do usuário')
          redirect('/login')
        }

        setAccount(response.result.data)
      })
    }

    fetchAccount()
  }, [])

  return (
    <MainContainer className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {isPending ? (
        <div className="size-16 rounded-full border-x-2 animate-spin mx-auto mt-10" />
      ) : account ? (
        <>
          <section className="flex flex-col gap-2 items-center">
            <UserAvatar className="size-52 text-6xl" />
            <h2 className="text-3xl font-bold">{formatUserName(account)}</h2>
          </section>
          <section>
            <h2 className="text-2xl font-bold">Informações pessoais</h2>
            <dl>
              <dt className="font-medium mt-4">Email</dt>
              <dd>{account.email}</dd>

              <dt className="font-medium mt-4">Data de nascimento</dt>
              <dd>{formatDate(account.birthDate)}</dd>
            </dl>
          </section>
        </>
      ) : null}
    </MainContainer>
  )
}

export default MePage
