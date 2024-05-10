import Link from 'next/link'
import React from 'react'
import { GoPersonAdd } from "react-icons/go";
import { GoOrganization } from "react-icons/go";

export default function Register() {
  return (
    <div className='bg-xwhite min-h-[calc(100vh-64px)] flex flex-col items-center justify-center pb-10'>
      <h1 className='text-xgreen2 text-4xl md:text-5xl font-bold mb-4 text-center text-balance mx-10'>Choose your account type.</h1>
      <h2 className='text-zinc-500 text-lg md:text-xl mb-7'>Click one of the following types:</h2>
      <div className='flex gap-5 md:gap-10 flex-wrap justify-center mx-7'>
        <Link href={'/signup/user'} className='flex flex-col justify-center items-center w-60 h-72 md:w-80 md:h-96  md:hover:drop-shadow-[0_0_7px_rgba(0,0,0,0.3)] transition-all drop-shadow-[0_0_4px_rgba(0,0,0,0.3)] rounded-xl bg-white'>
          <GoPersonAdd className='text-[12rem] md:text-[15rem] text-xblue'/>
          <h3 className='text-xgreen font-normal text-2xl md:text-4xl pb-2'>Consumer</h3>
          <p className='text-zinc-500'>Explore, save, book events.</p>
        </Link>
        <Link href={'/signup/organizer'} className='flex flex-col justify-center items-center w-60 h-72 md:w-80 md:h-96 md:hover:drop-shadow-[0_0_7px_rgba(0,0,0,0.3)] transition-all  drop-shadow-[0_0_4px_rgba(0,0,0,0.3)] rounded-xl bg-white'>
        <GoOrganization className='text-[12rem] md:text-[15rem] text-xblue'/>
        <h3 className='text-xgreen font-normal text-2xl md:text-4xl pb-2'>Organizer</h3>
          <p className='text-zinc-500'>Create, manage, track events.</p>
        </Link>
      </div>
    </div>
  )
}