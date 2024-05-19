import React from 'react'
import { RiFileChartFill } from 'react-icons/ri';
import { RiCalendarScheduleFill } from "react-icons/ri";
import { FaMoneyCheck } from "react-icons/fa";
import dynamic from 'next/dynamic';
import { getUserTrans } from '@/app/action';
const Point = dynamic(() => import('@/components/pointBox'), { ssr: false })

export default async function General() {
  const data = await getUserTrans()
  return (
    <div className='sm:p-7 p-2 w-full'>
      <div className='flex gap-2 bg-xdark w-full p-4 max-sm:py-2 text-xgreen1 text-3xl max-md:text-2xl max-sm:text-xl items-center rounded-2xl shadow-[0_0_5px_rgba(0,0,0,0.3)]'>
      <RiFileChartFill className='text-4xl'/>
        <h1 className=''>General Informations</h1>
      </div>

      <div className='flex w-full flex-wrap gap-5 my-7'>

      <div className='bg-xmetal shadow-[0_0_5px_rgba(0,0,0,0.3)] max-sm:min-w-[200px] max-md:min-w-[400px] max-lg:min-w-[250px] lg:w-[284px] grow rounded-xl min-h-40 xl:min-h-[500px] py-6 px-10 flex flex-col'>
          <h2 className='text-2xl text-xgreen1 w-60 gap-2 flex items-center'>
            <RiCalendarScheduleFill  />
            Upcoming Events
          </h2>
          <div className='flex items-center xl:justify-center grow'>
            <p className='text-6xl xl:text-[10rem] font-light text-white'>{data.upcoming}</p>
            <p className='text-lg text-zinc-400 font-normal mb-1 ml-1'> Event(s)</p>
          </div>
        </div>
        
        <div className='bg-xmetal shadow-[0_0_5px_rgba(0,0,0,0.3)] max-sm:min-w-[200px] max-md:min-w-[400px] max-lg:min-w-[250px] lg:w-[284px] grow rounded-xl min-h-40 xl:min-h-[500px] py-6 px-10 flex flex-col'>
          <h2 className='text-2xl text-xgreen1 w-60 gap-2 flex items-center'>
            <FaMoneyCheck />
            Total Transactions
          </h2>
          <div className='flex items-center xl:justify-center grow'>
            <p className='text-6xl xl:text-[10rem] font-light text-white'>{data.successTrans}</p>
            <p className='text-lg text-zinc-400 font-normal mb-1 ml-1'> Transaction(s)</p>
          </div>
        </div>

      </div>

      <div className='mt-7'>
        <Point />
      </div>


    </div>
  )
}
