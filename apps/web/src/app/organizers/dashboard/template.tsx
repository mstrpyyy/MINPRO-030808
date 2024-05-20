'use client';

import React, { useEffect, useState } from 'react';
import { MdOutlineTableChart } from 'react-icons/md';
import { MdTableChart } from 'react-icons/md';
import { RiFileChartLine } from 'react-icons/ri';
import { RiFileChartFill } from 'react-icons/ri';
import { MdOutlineManageAccounts } from 'react-icons/md';
import { MdManageAccounts } from 'react-icons/md';
import { MdEditCalendar } from "react-icons/md";
import { usePathname, useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import Link from 'next/link';
const DashboardOwner = dynamic(() => import('@/components/dashboardOwnerCard'), { ssr: false })

export default function Template({children}: Readonly<{children: React.ReactNode}>) {
  const router = useRouter()
  const pathname = usePathname();
  const [activeButton, setActiveButton] = useState('');

  useEffect(() => {
    setActiveButton(pathname.slice(22))
  }, [pathname])

  return (
    <div className="bg-xwhite min-h-[calc(100vh-64px)] flex">
      <div className="h-[calc(100vh-64px)] flex flex-col max-sm:hidden justify-between overflow-y-auto w-20 lg:w-80 sticky top-[67px] grow-0 shrink-0 py-10 bg-xdark">
        <DashboardOwner />
        <div className="flex flex-col  justify-center items-center ">
          <button
            onClick={() => {router.push('/organizers/dashboard/general')}}
            className={`w-full text-xl transition-colors text-white p-6 hover:bg-xmetal text-left flex items-center gap-2 
            ${
              activeButton == 'general'
                ? 'bg-xmetal font-bold lg:pl-10'
                : 'bg-xdark'
            }`}
          >
            <RiFileChartLine
              className={`text-3xl  ${
                activeButton == 'general' ? 'hidden' : 'block'
              }`}
            />
            <RiFileChartFill
              className={`text-3xl  ${
                activeButton == 'general' ? 'block' : 'hidden'
              }`}
            />
            <p className='hidden lg:block'>General</p>
          </button>
          <button
            onClick={() => {router.push('/organizers/dashboard/event-management')}}
            className={`w-full text-xl transition-colors text-white p-6 hover:bg-xmetal text-left flex items-center gap-2 
            ${
              activeButton.includes('event-management')
                ? 'bg-xmetal font-bold lg:pl-10'
                : 'bg-xdark'
            }`}
          >
            <MdOutlineTableChart
              className={`text-3xl  ${
                activeButton.includes('event-management') ? 'hidden' : 'block'
              }`}
            />
            <MdTableChart
              className={`text-3xl  ${
                activeButton.includes('event-management')? 'block' : 'hidden'
              }`}
            />
            <p className='hidden lg:block'>Event Management</p>
          </button>
          <button
            onClick={() => {router.push('/organizers/dashboard/account-settings')}}
            className={`w-full text-xl transition-colors text-white p-6 hover:bg-xmetal text-left flex items-center gap-2 
            ${
              activeButton == 'account-settings'
                ? 'bg-xmetal font-bold lg:pl-10'
                : 'bg-xdark'
            }`}
          >
            <MdOutlineManageAccounts
              className={`text-3xl  ${
                activeButton == 'account-settings' ? 'hidden' : 'block'
              }`}
            />
            <MdManageAccounts
              className={`text-3xl  ${
                activeButton == 'account-settings' ? 'block' : 'hidden'
              }`}
            />
            <p className='hidden lg:block'>Account Settings</p>
          </button>
        </div>
        <div className="flex justify-center">
          <button
          onClick={() => {router.push('/organizers/dashboard/create-event')}} 
          className="text-white text-xl bg-xgreen2 transition-colors hover:bg-xgreen1 p-2 px-4 rounded-xl flex justify-center items-center gap-2">
          <Link href={'/organizers/dashboard/create-event'} className='hidden lg:block'>Create Event</Link>
            < MdEditCalendar className='text-3xl'/>
          </button>
        </div>
      </div>
        {children}
    </div>
  );
}
