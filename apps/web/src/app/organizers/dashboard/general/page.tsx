import React from 'react'
import { RiFileChartFill } from 'react-icons/ri';
import { RiCalendarScheduleFill } from "react-icons/ri";
import { FaCalendarCheck } from "react-icons/fa";
import { RiMailStarFill } from "react-icons/ri";
import { FaMoneyBillWave } from "react-icons/fa";
import { FaMoneyCheck } from "react-icons/fa";
import { BsTicketDetailedFill } from "react-icons/bs";

export default function General() {
  return (
    <div className='m-7 w-full'>
      <div className='flex gap-2 bg-white w-full p-4 max-sm:py-2 text-xgreen2 text-3xl max-md:text-2xl max-sm:text-xl items-center rounded-2xl shadow-[0_0_5px_rgba(0,0,0,0.3)]'>
      <RiFileChartFill className='text-4xl'/>
        <h1 className=''>General Informations</h1>
      </div>

      <div className='flex w-full flex-wrap gap-5 my-7'>
        <div className='bg-white shadow-[0_0_5px_rgba(0,0,0,0.3)] max-sm:min-w-[200px] max-md:min-w-[400px] max-lg:min-w-[250px] min-w-[400px] grow rounded-xl min-h-40 py-6 px-10 flex flex-col'>
          <h2 className='text-2xl text-xgreen2 w-60 gap-2 flex items-center'>
            <FaCalendarCheck  />
            Active Events
          </h2>
          <div className='flex grow items-end'>
            <p className='text-6xl font-light text-xmetal'>0</p>
            <p className='text-lg text-zinc-400 font-normal mb-1 ml-1'>Event(s)</p>
          </div>
        </div>

        <div className='bg-white shadow-[0_0_5px_rgba(0,0,0,0.3)] max-sm:min-w-[200px] max-md:min-w-[400px] max-lg:min-w-[250px] min-w-[400px] grow rounded-xl min-h-40 py-6 px-10 flex flex-col'>
          <h2 className='text-2xl text-xgreen2 w-60 gap-2 flex items-center'>
            <RiCalendarScheduleFill  />
            Scheduled Events
          </h2>
          <div className='flex items-end grow'>
            <p className='text-6xl font-light text-xmetal'>0</p>
            <p className='text-lg text-zinc-400 font-normal mb-1 ml-1'> Event(s)</p>
          </div>
        </div>

        <div className='bg-white shadow-[0_0_5px_rgba(0,0,0,0.3)] max-sm:min-w-[200px] max-md:min-w-[400px] max-lg:min-w-[250px] min-w-[400px] grow rounded-xl min-h-40 py-6 px-10 flex flex-col'>
          <h2 className='text-2xl text-xgreen2 w-60 gap-2 flex items-center'>
            <RiMailStarFill />
            Average Reviews
          </h2>
          <div className='flex items-end grow'>
            <p className='text-6xl font-light text-xmetal'>0</p>
            <p className='text-lg text-zinc-400 font-normal mb-1 ml-1'> /5</p>
          </div>
        </div>

      <div className='bg-white shadow-[0_0_5px_rgba(0,0,0,0.3)] max-sm:min-w-[200px] max-md:min-w-[400px] max-lg:min-w-[250px] min-w-[400px] grow rounded-xl min-h-40 py-6 px-10 flex flex-col'>
          <h2 className='text-2xl text-xgreen2 w-60 gap-2 flex items-center'>
            <FaMoneyBillWave />
            Total Revenues
          </h2>
          <div className='flex items-end grow'>
            <p className='text-6xl font-light text-xmetal'>0</p>
            <p className='text-lg text-zinc-400 font-normal mb-1 ml-1'> Rupiah(s)</p>
          </div>
        </div>

        <div className='bg-white shadow-[0_0_5px_rgba(0,0,0,0.3)] max-sm:min-w-[200px] max-md:min-w-[400px] max-lg:min-w-[250px] min-w-[400px] grow rounded-xl min-h-40 py-6 px-10 flex flex-col'>
          <h2 className='text-2xl text-xgreen2 w-60 gap-2 flex items-center'>
            < BsTicketDetailedFill  />
            Tickets Sold
          </h2>
          <div className='flex items-end grow'>
            <p className='text-6xl font-light text-xmetal'>0</p>
            <p className='text-lg text-zinc-400 font-normal mb-1 ml-1'> Ticket(s)</p>
          </div>
        </div>
        
        <div className='bg-white shadow-[0_0_5px_rgba(0,0,0,0.3)] max-sm:min-w-[200px] max-md:min-w-[400px] max-lg:min-w-[250px] min-w-[400px] grow rounded-xl min-h-40 py-6 px-10 flex flex-col'>
          <h2 className='text-2xl text-xgreen2 w-60 gap-2 flex items-center'>
            <FaMoneyCheck />
            Total Transactions
          </h2>
          <div className='flex items-end grow'>
            <p className='text-6xl font-light text-xmetal'>0</p>
            <p className='text-lg text-zinc-400 font-normal mb-1 ml-1'> Transaction(s)</p>
          </div>
        </div>
      </div>
    </div>
  )
}
