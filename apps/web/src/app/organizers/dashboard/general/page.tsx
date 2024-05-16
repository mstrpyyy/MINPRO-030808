'use client'
import React, { useEffect, useState } from 'react'
import { RiFileChartFill } from 'react-icons/ri';
import { RiCalendarScheduleFill } from "react-icons/ri";
import { FaCalendarCheck } from "react-icons/fa";
import { RiMailStarFill } from "react-icons/ri";
import { FaMoneyBillWave } from "react-icons/fa";
import { FaMoneyCheck } from "react-icons/fa";
import { BsTicketDetailedFill } from "react-icons/bs";
import Cookies from 'js-cookie';
import StatBox from '@/components/statBox';

interface Stat {
  activeEvent?: number | 0,
  scheduledEvent?: number | 0,
  ticketSold?: number | 0,
  totalRevenue?: number | 1000,
  totalTransaction?: number | 0,
  averageReview?: number | 0
}

export default function General() {
  const [stat, setStat] = useState<Stat>({})

  const getStat = async(token: string) => {
    try {
      const res = await fetch('http://localhost:8000/api/organizers', {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      })
      const data = await res.json()
      setStat(data)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const token = Cookies.get("token")
    if (token) {
      getStat(token)
    }
  }, [])

  return (
    <div className='sm:p-7 p-2 w-full'>
      <div className='flex gap-2 bg-xdark w-full p-4 max-sm:py-2 text-xgreen1 text-3xl max-md:text-2xl max-sm:text-xl items-center rounded-2xl shadow-[0_0_5px_rgba(0,0,0,0.3)]'>
      <RiFileChartFill className='text-4xl'/>
        <h1 className=''>General Informations</h1>
      </div>

      <div className='flex w-full flex-wrap gap-5 my-7'>
        <StatBox 
        Icon={FaCalendarCheck}
        title={'Active Event'}
        data={stat.activeEvent!}
        description={'Event(s)'}
        />

        <StatBox 
        Icon={RiCalendarScheduleFill}
        title={'Scheduled Events'}
        data={stat.scheduledEvent!}
        description={'Event(s)'}
        />

        
        <StatBox 
        Icon={RiMailStarFill}
        title={'Average Reviews'}
        data={+stat.averageReview?.toFixed(2)! || 0}
        description={'/5'}
        />

        <StatBox 
        Icon={FaMoneyBillWave}
        title={'Total Revenues'}
        data={Intl.NumberFormat('en-DE').format(stat.totalRevenue || 0)}
        description={'Rupiah(s)'}
        />

        <StatBox 
        Icon={BsTicketDetailedFill}
        title={'Tickets Sold'}
        data={stat.ticketSold!}
        description={'Ticket(s)'}
        />

        <StatBox 
        Icon={FaMoneyCheck}
        title={'Total Transactions'}
        data={stat.totalTransaction!}
        description={'Transaction(s)'}
        />
      </div>
    </div>
  )
}
