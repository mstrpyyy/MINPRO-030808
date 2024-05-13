'use client'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

export default function waitingVerification() {
    const router = useRouter()

    useEffect(() => {
        setTimeout(() => {
            router.push('/')
        }, 3000)
    })
  return (
    <div className='flex flex-col bg-xwhite justify-center items-center min-h-[calc(100vh-64px)] px-10'>
      <h1 className='text-xgreen text-4xl md:text-5xl font-bold mb-4 text-center text-balance mx-10'>
        You are not Authorized!
      </h1>
      <h2 className='text-zinc-500 text-lg md:text-xl mb-14 text-center'>
        redirecting back to home page.
      </h2>      
    </div>
  )
}