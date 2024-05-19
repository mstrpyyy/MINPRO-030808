'use client'
import { getUserTrans } from '@/app/action';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { string } from 'yup';

interface ITransactionEvent {
  id?: number
  event?: IEvent,
  slug?: string,
  status?: string
  quantity?: number
  grandTotal?: number
  createdAt?: Date
}

interface IData {
  transaction?: ITransactionEvent[]
}

interface IEvent {
  name?: string
  eventDate?: Date
}

export default function UserTransList() {
  const [event, setEvent] = useState<IData>({})

  
  const getData = async() => {
    try {
      const data = await getUserTrans()
      console.log(data);
      setEvent(data)
    } catch (error) {
      console.log(error);
    }

  }
  useEffect(() => { 
    getData()
  }, [])

  return (
    <div className='overflow-x-auto w-full vertical-scroll'>
      <table className="table w-full">
        <thead>
          <tr className='text-xgreen'>
            <th className='w-2'></th>
            <th className='text-center'>Event</th>
            <th className='text-center min-w-52'>Date</th>
            <th className='text-center'>Tickets</th>
            <th className='text-center'>Total (IDR)</th>
            <th className='text-center min-w-52'>Created</th>
            <th className='text-center'>Status</th>
            <th className='text-center'></th>
          </tr>
        </thead>
        <tbody 
        // className={event.transaction?.length! > 0? '' : 'hidden'}
        >
          {event.transaction?.map((item, index) => {
            let d1 = new Date(item.createdAt!)
            let d2 = new Date(item.event?.eventDate!)
            let transD = d1.toDateString()
            let eventD = d2.toDateString()
            let transT =d1.toTimeString().slice(0,5)
            let eventT =d2.toTimeString().slice(0,5)
            return (
              <tr key={item.id}>
                <th className='w-2'>{index + 1}</th>
                <td className='text-xgreen2 font-bold'>{item.event?.name}</td>
                <td className='text-center text-xmetal min-w-52'>{eventD}<br/>{eventT} WIB</td>
                <td className='text-center text-xmetal'>{item.quantity}</td>
                <td className='text-center text-xmetal'>{Intl.NumberFormat('en-DE').format(item.grandTotal!)}</td>
                <td className='text-center text-xmetal min-w-52'>{transD}<br/>{transT} WIB</td>
                <td className='text-center text-xmetal'>
                  {item.status == 'WaitingConfirmation' 
                  ? 'Waiting Confirmation'
                  : item.status == 'WaitingPayment'
                  ? 'Waiting Payment'
                  : item.status
                }
                  </td>
                <td className='text-center text-xmetal flex flex-col gap-2'>
                  <Link href={`/`} className='bg-xgreen2 text-white px-2 py-1 rounded-xl min-w-24'>See Detail</Link>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <div className={`w-full ${event.transaction?.length! > 0? 'hidden' : 'block'} text-center py-5 text-zinc-400`}>no data</div>
    </div>
  )
}
