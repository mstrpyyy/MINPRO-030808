'use client'
import React from 'react'
import * as yup from 'yup'

const registerSchema = yup.object().shape({
    name: yup.string().required('name can not be empty'),
    startSale:yup.date().required('sale date can not be empty'),
    eventDate: yup.date().required('event date can not be empty'),
    isFree: yup.boolean(),
    price: yup.number(),
    category: yup.string(),
    address: yup.string(),
    city: yup.string(),
    availableTickets: yup.number(),
    description: yup.string(),
    password: yup.string().min(6, 'password must contains at least 6 characters').required('password can not be empty'),
}) 



export default function CreateEventForm() {


  return (
    <div className='flex justify-evenly w-full max-md:flex-col '>

          <div className='flex flex-col justify-between items-center grow max-w-[600px]'>
          </div>

          <div className="divider max-sm:hidden sm:divider-horizontal before:bg-zinc-300 after:bg-zinc-300"></div> 

          <div className='flex flex-col justify-between items-center grow max-w-[600px]'>
          </div>

    </div>
  )
}
