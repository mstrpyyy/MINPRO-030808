import { Card } from '@/components/card';
import MainHero from '@/components/mainHero'
import dynamic from 'next/dynamic';
const Point = dynamic(() => import('@/components/pointBox'), { ssr: false })

export default function Home() {

  return (
   <div className='bg-xwhite min-h-screen flex justify-center'>
    <div className='flex flex-col w-full md:w-[80%]'>
      <MainHero />
      <Point />
      <Card />
    </div>
   </div>
  )
}
