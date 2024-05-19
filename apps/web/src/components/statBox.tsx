import React from 'react'
import { IconType } from 'react-icons';

export default function StatBox({data, title, description, Icon} :{data:number | string; title: string; description:string; Icon:IconType}) {
  return (
    <div className='bg-white shadow-[0_0_5px_rgba(0,0,0,0.3)] max-sm:min-w-[270px] min-w-[300px] 2xl:min-w-[350px] flex-1 rounded-xl min-h-40 py-6 px-10 flex flex-col'>
          <h2 className='text-2xl text-xgreen2 w-60 gap-2 flex items-center'>
            <Icon  />
            {title}
          </h2>
          <div className='flex flex-1 items-end'>
            <p className='text-3xl font-light text-xmetal'>{data}</p>
            <p className='text-lg text-zinc-400 font-normal mb-1 ml-1'>{description}</p>
          </div>
        </div>
  )
}
