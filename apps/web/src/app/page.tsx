"use client"
import Image from 'next/image'
import styles from './page.module.css'
import MainHero from '@/components/mainHero'
import { useEffect } from 'react';

export default function Home() {
  return (
   <div className='bg-xwhite h-screen flex justify-center'>
    <div className='flex w-full md:w-[80%]'>
      <MainHero />
    </div>
   </div>
  )
}
