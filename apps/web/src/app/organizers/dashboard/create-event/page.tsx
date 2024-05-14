import CreateEventForm from '@/components/createEventForm';
import React from 'react'
import { MdEditCalendar } from "react-icons/md";

export default function CreateEvent() {
  return (
    <div className='m-2 xl:m-7 w-full'>
      <div className='flex gap-2 bg-white w-full p-4 max-sm:py-2 text-xgreen2 text-3xl max-md:text-2xl max-sm:text-xl items-center rounded-2xl shadow-[0_0_5px_rgba(0,0,0,0.3)]'>
      <MdEditCalendar className='text-4xl'/>
        <h1 className=''>Create Event</h1>
      </div>

      <div className='flex flex-col my-7 bg-white w-full px-10 py-5 items-center rounded-2xl shadow-[0_0_5px_rgba(0,0,0,0.3)]'>

        <div>
          <h2 className='text-xgreen2 text-3xl max-md:text-2xl max-sm:text-xl'>Event Form</h2>
        </div>

        <CreateEventForm />
      </div>

  
    </div>
  )
}
