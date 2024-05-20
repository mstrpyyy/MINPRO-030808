"use client"
import { useAppSelector } from '@/lib/features/hooks';
import Link from 'next/link';
import React, { useState } from 'react'
import { MdOutlineContentCopy } from "react-icons/md";
import { PiEye } from "react-icons/pi";
import { PiEyeSlash } from "react-icons/pi";
import PointDetail from './pointDetail';

export default function PointBox() {
    const [showReferral, setShowReferral] = useState("hidden")
    const account = useAppSelector((state) => state.account.value)

    const showReferralCode = () => {
        if (showReferral == "hidden") {
            setShowReferral("show")
        } else if (showReferral == "show") {
            setShowReferral("hidden")
        }
    }

    const openModalUserPoint = () => {
        const modal = document.getElementById("my_modal_pointDetail");
        if (modal instanceof HTMLDialogElement) {
            modal.showModal()}
      }


  return (
    <div className='w-full flex flex-wrap drop-shadow-[0_0_4px_rgba(0,0,0,0.3)] gap-4 max-md:px-4 max-md:my-5'>
        <div className={`bg-xdark h-32 flex-1 min-w-[300px] flex-col rounded-xl justify-center items-center ${account?.accountType == "user" ? "flex" : "hidden"}`}>
            <p className='text-xl text-xgreen3 font-semibold'>
                Your points:
            </p>   
            <p className='text-4xl text-xgreen1'>
                {new Intl.NumberFormat('en-DE').format(+account?.sumPoint!)}
            </p> 
            <p className={`text-white ${+account?.sumPoint! == 0? "hidden" : "block"}`} >
                {new Intl.NumberFormat('en-DE').format(+account?.expireSoonPoint!)}pts will expire soon.
                {/* on {account?.expireDate?.slice(0, 10)} */}
                <button onClick={openModalUserPoint} className='underline ml-2'>details</button>
            </p>
            <p className={`text-white ${+account?.sumPoint! == 0? "block" : "hidden"}`} >Get 10.000pts for every referral redeem!</p>
        </div>
        
        <div className={`bg-xdark h-32 flex-1 min-w-[300px] flex flex-col rounded-xl justify-center items-center ${account?.accountType == "user" ? "flex" : "hidden"}`}>
            <p className='text-xl text-xgreen3 font-semibold'>Your referral code:</p>
            <div className='flex justify-between w-64 items-center'>
                <p className={`text-4xl text-xgreen1 ${showReferral == "show" ? "block" : "hidden"}`}>{account?.referral}</p>
                <p className={`text-4xl text-xgreen1 ${showReferral == "show" ? "hidden" : "block"}`}>{'●'.repeat(account?.referral?.length!)}</p>
                <div className='flex items-center gap-1'>
                    <button onClick={showReferralCode}>
                        <PiEye className={`text-zinc-300 text-xl ${showReferral == "show" ? "block" : "hidden"}`}/>
                        <PiEyeSlash className={`text-zinc-300 text-xl ${showReferral == "show" ? "hidden" : "block"}`}/>
                    </button>
                    <button onClick={() =>  navigator.clipboard.writeText(account?.referral!)}>
                        <MdOutlineContentCopy className='text-zinc-300'/>
                    </button>
                </div>
            </div>
            <p className={`text-white`} >Share your referral and get points!</p>
        </div>
        
        <div  className={`signupCTA h-32 grow flex-col rounded-xl justify-center items-center ${account?.accountType == null ? "flex" : "hidden"}`}>
            <h1 className='text-2xl max-md:text-center font-semibold md:text-4xl text-xgreen3'>Sign up today and get rewards!</h1>
            <p className='max-md:text-sm max-md:text-center text-white'>Sign up, invite friends, and unlock exclusive discounts together.</p>
        </div>
        

        <Link href={'/organizers/dashboard/account-settings'} className={`bg-white min-w-60 hover:bg-xwhite transition-colors hover:cursor-pointer select-none w-3 h-14 grow flex-col rounded-xl justify-center items-center ${account?.accountType == "organizer" ? "flex" : "hidden"}`}>
            <h1 className='text-xl text-xblue'>Manage account</h1>
        </Link>
        <Link href={'/organizers/dashboard/general'} className={`bg-white min-w-60 hover:bg-xwhite transition-colors hover:cursor-pointer select-none w-3 h-14 grow flex-col rounded-xl justify-center items-center ${account?.accountType == "organizer" ? "flex" : "hidden"}`}>
            <h1 className='text-xl text-xblue'>Dashboard</h1>
        </Link>
        <Link href={'/organizers/dashboard/create-event'} className={`bg-xgreen3 min-w-60 hover:bg-xgreen transition-colors hover:cursor-pointer select-none w-3 h-14 grow flex flex-col rounded-xl justify-center items-center ${account?.accountType == "organizer" ? "flex" : "hidden"}`}>
            <h1 className='text-xl text-white'>Create Event</h1>
        </Link>
        
        <PointDetail />

    </div>
    )
}
