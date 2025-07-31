'use client'
import { SessionProvider } from 'next-auth/react'
import { React } from 'react'

export default function Providers(props) {
  return <SessionProvider>{props.children}</SessionProvider>
}
