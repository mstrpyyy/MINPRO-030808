import MainHero from '@/components/mainHero'
import dynamic from 'next/dynamic';
const Point = dynamic(() => import('@/components/pointBox'), { ssr: false })

export default function Home() {

  return (
   <div className='bg-xwhite h-[2000px] flex justify-center'>
    <div className='flex flex-col w-full md:w-[80%]'>
      <MainHero />
      <Point />
    </div>
   </div>
  )
}
