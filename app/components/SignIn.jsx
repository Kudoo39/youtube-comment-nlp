'use client'
import React from 'react'
import { signIn, signOut, useSession } from 'next-auth/react'

const SignInButton = () => {
  const { data: session } = useSession()
  if (session && session.user) {
    return (
      <div className='absolute right-4 top-4'>
        <button
          onClick={() => signOut}
          className='text-black bg-blue-100 hover:bg-blue-200 py-1 px-2 rounded-md border-2 border-black'
        >
          Sign Out
        </button>
      </div>
    )
  }
  return (
    <div className='absolute right-4 top-4'>
      <button
        onClick={() => signIn()}
        className='text-black bg-main-pink py-1 px-2 rounded-md border-2 border-black'
      >
        Sign In
      </button>
    </div>
  )
}

export default SignInButton
