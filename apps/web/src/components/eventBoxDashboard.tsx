'use client'
import { getEvents } from '@/app/action';
import Cookies from 'js-cookie';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

interface Event {
  id?: number,
  name?: string,
  startSale?: string,
  eventDate?: string,
  availableTickets?: number | 0,
  city?: string,
  slug?: string,
  status?: string
  message?: string
}

interface EventResponse {
  event?: Event[]
}

export default function EventBoxDashboard() {
  const [event, setEvent] = useState<EventResponse>({})

  
  const getData = async() => {
    try {
      const data = await getEvents()
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
      <table className="table w-96 lg:w-full">
        <thead>
          <tr className='text-xgreen'>
            <th className='w-2'></th>
            <th className='w-52 text-center'>Event Name</th>
            <th className='text-center'>Sale Start</th>
            <th className='text-center'>Event Date</th>
            <th className='text-center'>Status</th>
            <th className='text-center'>City</th>
            <th className='text-center'>Tickets</th>
            <th className='text-center'>Event Details</th>
            <th className='text-center'>Confirm Payment</th>
          </tr>
        </thead>
        <tbody>
          {event.event?.map((item, index) => {
            let d1 = new Date(item.startSale!)
            let d2 = new Date(item.eventDate!)
            let saleD = d1.toLocaleDateString()
            let saleT = d1.toTimeString().slice(0,5)
            let eventD = d2.toLocaleDateString()
            let eventT =d2.toTimeString().slice(0,5)
            return (
              <tr key={item.slug}>
                <th className='w-2'>{index + 1}</th>
                <td className='text-xgreen2 font-bold w-64'>{item.name}</td>
                <td className='text-center text-xmetal'>{saleD}<br/>{saleT}</td>
                <td className='text-center text-xmetal'>{eventD}<br/>{eventT}</td>
                <td className='text-center text-xmetal'>{item.status}</td>
                <td className='text-center text-xmetal'>{item.city}</td>
                <td className='text-center text-xmetal'>{item.availableTickets}</td>
                <td className='text-center text-xmetal'>
                  <Link href={`/organizers/dashboard/event-management/${item.slug}`} className='bg-xgreen2 text-white px-2 py-1 rounded-xl'>Details</Link>
                </td>
                <td className='text-center text-xmetal'>
                  <Link href={`/organizers/dashboard/event-management/payment-confirmations/${item.id}`} className='bg-xgreen2 text-white px-2 py-1 rounded-xl'>Confirm</Link>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
