import React from 'react'

export default function Loading() {
  return (
    <div className='flex justify-center items-center w-full h-[calc(100vh-64px)] bg-xwhite text-xgreen text-4xl sm:text-5xl font-bold text-center'>
      Loading<span className="ml-5 loading loading-dots loading-lg"></span>
    </div>
  )
}
