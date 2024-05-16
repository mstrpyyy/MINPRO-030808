import React from 'react'

export default function EventInfoList({name, eventDate, eventTime, city, address, price, saleDate, saleTime, category, ticket, promo, description} : {name: string; eventDate: string; eventTime: string; city: string; address: string; price: number; saleDate: string; saleTime: string; category: string; ticket: number; promo: any[]; description: string}) {

  console.log(promo);
  return (
    <div className='flex flex-col flex-1 sm:min-w-[400px] overflow-hidden'>
      <div className='flex gap-2 max-sm:flex-wrap'>
        <div className='flex justify-between items-start w-full flex-col border-b-2 border-zinc-300 shrink sm:p-2 py-2 overflow-x-hidden'>
          <p className='text-xgreen text-sm font-semibold'>Name</p>
          <p className='text-xmetal text-lg w-full sm:pr-5 truncate'>{name}</p>
        </div>

        <div className='flex justify-between items-start w-full flex-col border-b-2 border-zinc-300 shrink sm:p-2 py-2 overflow-x-hidden'>
          <p className='text-xgreen text-sm font-semibold'>Category</p>
          <p className='text-xmetal text-lg w-full sm:pr-5 truncate'>{category}</p>
        </div>
      </div>
      
      <div className='flex gap-2 max-sm:flex-wrap'>
        <div className='flex justify-between items-start w-full flex-col border-b-2 border-zinc-300 shrink sm:p-2 py-2 overflow-x-hidden'>
          <p className='text-xgreen text-sm font-semibold'>city</p>
          <p className='text-xmetal text-lg w-full sm:pr-5 truncate'>{city}</p>
        </div>

        <div className='flex justify-between items-start w-full flex-col border-b-2 border-zinc-300 shrink sm:p-2 py-2 overflow-x-hidden'>
          <p className='text-xgreen text-sm font-semibold'>Address</p>
          <p className='text-xmetal text-lg w-full sm:pr-5 truncate'>{address}</p>
        </div>
      </div>

      <div className='flex gap-2 max-sm:flex-wrap'>
        <div className='flex justify-between items-start w-full flex-col border-b-2 border-zinc-300 shrink sm:p-2 py-2 overflow-x-hidden'>
          <p className='text-xgreen text-sm font-semibold'>Sale Date</p>
          <p className='text-xmetal text-lg w-full sm:pr-5 truncate'>{saleDate} @ {saleTime}</p>
        </div>

        
        <div className='flex justify-between items-start w-full flex-col border-b-2 border-zinc-300 shrink sm:p-2 py-2 overflow-x-hidden'>
          <p className='text-xgreen text-sm font-semibold'>Event Date</p>
          <p className='text-xmetal text-lg w-full sm:pr-5 truncate'>{eventDate} @ {eventTime}</p>
        </div>
      </div>

      <div className='flex gap-2 max-sm:flex-wrap'>
        <div className='flex justify-between items-start w-full flex-col border-b-2 border-zinc-300 shrink sm:p-2 py-2 overflow-x-hidden'>
          <p className='text-xgreen text-sm font-semibold'>Price</p>
          <p className='text-xmetal text-lg w-full sm:pr-5 truncate'>{price}</p>
        </div>
    

        <div className='flex justify-between items-start w-full flex-col border-b-2 border-zinc-300 shrink sm:p-2 py-2 overflow-hidden'>
          <p className='text-xgreen text-sm font-semibold'>Tickets</p>
          <p className='text-xmetal text-lg w-full sm:pr-5 truncate'>{ticket}</p>
        </div>
      </div>

      <div className='flex justify-between items-start w-full flex-col border-b-2 border-zinc-300 shrink sm:p-2 py-2'>
          <p className='text-xgreen text-sm font-semibold'>Promo List</p>
          <div className='flex max-sm:flex-wrap gap-1'>
            {promo.map((item) => {
              return (
                <div className='px-2 bg-xyellow text-sm text-white rounded-full'>{item.name}</div>
              )
            })}
          </div>
        </div>

      <div className='flex justify-between items-start w-full flex-col border-b-2 border-zinc-300 shrink sm:p-2 py-2'>
        <p className='text-xgreen text-sm font-semibold'>Description</p>
        <p className='text-xmetal text-base w-full sm:pr-5 '>{description}</p>
      </div>


      

      



    </div>
    )
}
