'use client'
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react'

interface Event {
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

  
  const getEvents = async(token:any) => {
    const res = await fetch('http://localhost:8000/api/events', {
      method: 'GET',
      headers: {
        "Content-Type" : "application/json",
        "Authorization": `Bearer ${token}`
      }
    })
    const data = await res.json()
    setEvent(data)
  }
  useEffect(() => {
    const token = Cookies.get('token')
    if (token) {
      getEvents(token)
    }
  }, [])

  return (
    <div className='bg-white my-7 shadow-[0_0_5px_rgba(0,0,0,0.3)] overflow-x-auto w-full rounded-xl py-3 px-5 md:px-10 '>
      <table className="table table-fixed min-w-[800px]">
        <thead>
          <tr className='text-xgreen'>
            <th className='w-2'></th>
            <th className='w-52 text-center'>event Name</th>
            <th className='text-center'>Start Sale</th>
            <th className='text-center'>Event Date</th>
            <th className='text-center'>Status</th>
            <th className='text-center'>City</th>
            <th className='text-center'>Available Tickets</th>
            <th className='text-center'></th>
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
                <td className='text-center text-xmetal'><button className='bg-xgreen2 text-white px-2 py-1 rounded-xl' onClick={() => {console.log(item.slug);}}>Details</button></td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
