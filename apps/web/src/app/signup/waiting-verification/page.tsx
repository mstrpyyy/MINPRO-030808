import React from 'react'

export default function waitingVerification() {
  return (
    <div className='flex flex-col bg-xwhite justify-center items-center min-h-[calc(100vh-64px)] px-10'>
      <h1 className='text-xorange text-4xl md:text-5xl font-bold mb-4 text-center text-balance mx-10'>
        Verification Sent!
      </h1>
      <h2 className='text-zinc-500 text-lg md:text-xl mb-14 text-center'>
        Verification link has been sent to your email, You may close this page.
      </h2>      
    </div>
  )
}
