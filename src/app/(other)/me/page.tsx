'use client'
import MainContainer from '@/components/system/main-container'
import UserAvatar from '@/components/user/avatar'
import { useAuth } from '@/context/auth-context'
import { formatDate, formatUserName } from '@/lib/format'
import React from 'react'

const MePage = () => {
  const { auth } = useAuth()

  if (!auth) return null

  return (
    <MainContainer className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <section className="flex flex-col gap-2 items-center">
        <UserAvatar className="size-52 text-6xl" />
        <h2 className="text-3xl font-bold">{formatUserName(auth)}</h2>
      </section>
      <section>
        <h2 className="text-2xl font-bold">Informações pessoais</h2>
        <dl>
          <dt className="font-medium mt-4">Email</dt>
          <dd>{auth.email}</dd>

          <dt className="font-medium mt-4">Data de nascimento</dt>
          <dd>{formatDate(auth.birthDate)}</dd>
        </dl>
      </section>
    </MainContainer>
  )
}

export default MePage
