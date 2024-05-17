'use client'
import { getEvents } from '@/app/action';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import ConfirmPaymentModal from './confirmPaymentModal';

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

export default function PaymentConfirmationList() {
//   const [event, setEvent] = useState<EventResponse>({})
  
  const openModal = () => {
    const modal = document.getElementById("my_modal_ConfirmPayment");
    if (modal instanceof HTMLDialogElement) {
        modal.showModal()}
  }

  
//   const getData = async() => {
//     try {
//       const data = await getEvents()
//       console.log(data);
//       setEvent(data)
//     } catch (error) {
//       console.log(error);
//     }

//   }
//   useEffect(() => { 
//     getData()
//   }, [])

  return (
    <div className='overflow-x-auto w-full vertical-scroll'>
      <table className="table w-96 lg:w-full">
        <thead>
          <tr className='text-xgreen'>
            <th className='w-2'></th>
            <th className='w-32 text-center'>User</th>
            <th className='text-center'>Transaction ID</th>
            <th className='text-center'>Payment Date</th>
            <th className='text-center'>Tickets</th>
            <th className='text-center'>Discounts</th>
            <th className='text-center'>Points</th>
            <th className='text-center'>Total Deduction</th>
            <th className='text-center'>Total</th>
            <th className='text-center'></th>
          </tr>
        </thead>
        <tbody>
        <tr>
            <th className='w-2'>1</th>
            <td className='text-xgreen2 font-bold max-w-32 truncate'>Arya fafifu wasweswos ngeow</td>
            <td className='text-center text-xmetal'>#1</td>
            <td className='text-center text-xmetal'>14 May 2024<br/>17.00</td>
            <td className='text-center text-xmetal'>2</td>
            <td className='text-center text-xmetal'>Early Bird<br/>10%</td>
            <td className='text-center text-xmetal'>30.000</td>
            <td className='text-center text-xmetal'>Rp50.000</td>
            <td className='text-center text-xmetal'>Rp150.000</td>
            <td className='text-center text-xmetal'>
                <button onClick={openModal} className='bg-xgreen2 text-white px-2 py-1 rounded-xl'>Confirm payment</button>
                <ConfirmPaymentModal />
            </td>
        </tr>
          {/* {event.event?.map((item, index) => {
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
              </tr>
            )
          })} */}
        </tbody>
      </table>
    </div>
  )
}
