"use client"
import { useAppSelector } from '@/lib/features/hooks';
import Link from 'next/link';
import React, { useState } from 'react'
import { MdOutlineContentCopy } from "react-icons/md";
import { PiEye } from "react-icons/pi";
import { PiEyeSlash } from "react-icons/pi";

export default function PointBox() {
    const [showReferral, setShowReferral] = useState("hidden")
    const account = useAppSelector((state) => state.account.value)
    console.log(+account?.sumPoint!);

    const showReferralCode = () => {
        if (showReferral ==  "hidden") {
            setShowReferral("show")
        } else if (showReferral == "show") {
            setShowReferral("hidden")
        }
    }

  return (
    <div className='w-full flex drop-shadow-[0_0_4px_rgba(0,0,0,0.3)] gap-4'>
        <div className={`bg-white h-32 grow flex-col rounded-xl justify-center items-center ${account?.accountType == "user" ? "flex" : "hidden"}`}>
            <p className='text-xl text-xgreen font-semibold'>
                Your points:
            </p>   
            <p className='text-4xl text-xgreen2'>
                {new Intl.NumberFormat('en-DE').format(+account?.sumPoint!)}
            </p> 
            <p className={`text-xmetal ${+account?.sumPoint! == 0? "hidden" : "block"}`} >
                {new Intl.NumberFormat('en-DE').format(+account?.expireSoonPoint!)}pts will expire on {account?.expireDate?.slice(0, 10)}
            </p>
            <p className={`text-xmetal ${+account?.sumPoint! == 0? "block" : "hidden"}`} >Share your referral and get points!</p>
        </div>
        <div className={`bg-white h-32 grow flex flex-col rounded-xl justify-center items-center ${account?.accountType == "user" ? "flex" : "hidden"}`}>
            <p className='text-xl text-xgreen font-semibold'>Your referral code:</p>
            <div className='flex justify-between'>
                <p className={`text-4xl text-xgreen2 ${showReferral == "show" ? "block" : "hidden"}`}>{account?.referral}</p>
                <p className={`text-4xl text-xgreen2 ${showReferral == "show" ? "hidden" : "block"}`}>{'-'.repeat(account?.referral?.length!)}</p>
                <button onClick={showReferralCode}>
                    <PiEye className={`text-zinc-500 ${showReferral == "show" ? "block" : "hidden"}`}/>
                    <PiEyeSlash className={`text-zinc-500 ${showReferral == "show" ? "hidden" : "block"}`}/>
                </button>
                <button onClick={() =>  navigator.clipboard.writeText(account?.referral!)}>
                    <MdOutlineContentCopy className='text-zinc-500'/>
                </button>
            </div>
            <p className={`text-xmetal ${account?.sumPoint == 0? "hidden" : "block"}`} >Share your referral and get points!</p>
        </div>
        <div  className={`signupCTA h-32 grow flex-col rounded-xl justify-center items-center ${account?.accountType == null ? "flex" : "hidden"}`}>
            <h1 className='text-4xl text-xgreen3'>Sign up today and get rewards!</h1>
            <p className='text-white'>Sign up, invite friends, and unlock exclusive discounts together.</p>
        </div>
        

        <Link href={'/organizers/dashboard/event-settings'} className={`bg-white hover:bg-xwhite transition-colors hover:cursor-pointer select-none w-3 h-14 grow flex-col rounded-xl justify-center items-center ${account?.accountType == "organizer" ? "flex" : "hidden"}`}>
            <h1 className='text-xl text-xblue'>Manage account</h1>
        </Link>
        <Link href={'/organizers/dashboard/general'} className={`bg-white hover:bg-xwhite transition-colors hover:cursor-pointer select-none w-3 h-14 grow flex-col rounded-xl justify-center items-center ${account?.accountType == "organizer" ? "flex" : "hidden"}`}>
            <h1 className='text-xl text-xblue'>Dashboard</h1>
        </Link>
        <div className={`bg-xgreen3 hover:bg-xgreen transition-colors hover:cursor-pointer select-none w-3 h-14 grow flex flex-col rounded-xl justify-center items-center ${account?.accountType == "organizer" ? "flex" : "hidden"}`}>
            <h1 className='text-xl text-white'>Create Event</h1>
        </div>

    </div>
  )
}
