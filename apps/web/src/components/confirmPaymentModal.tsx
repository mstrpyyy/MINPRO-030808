'use client'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import React, { useState } from 'react'
import Cookies from 'js-cookie';
import { FaCheck } from "react-icons/fa";
import Image from 'next/image';


export default function ConfirmPaymentModal() {
    const [loadingDisplay, setLoadingDisplay] = useState("hidden")
    const [isSave, setIsSave] = useState(false)


    const closeModal = () => {
        const modal = document.getElementById("my_modal_ConfirmPayment");
        if (modal instanceof HTMLDialogElement) {
            modal.close()}
        }


    const handleConfirm = async (dataSet: {name: string}) => {
        try {
         
            const token = Cookies.get("token")
            const res = await fetch('http://localhost:8000/api/accounts/change-name',{
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
              },
              body: JSON.stringify(dataSet)
            })  
            console.log(res);
            if (res.ok) {
              setIsSave(true)
              setTimeout(() => {
                closeModal()
                setIsSave(false)
              }, 1000);
            } else {
              throw res
            }
          } catch (error) {
            console.log(error);
          }
      }

  return (
    <dialog id="my_modal_ConfirmPayment" className="modal">
        <div className="modal-box flex flex-col bg-xdark items-center justify-center rounded-2xl max-w-[400px] drop-shadow-[0_0_4px_rgba(0,0,0,0.3)]">
            <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-zinc-400">✕</button>
            </form>
            <div className='my-4 '>
                <Image src={`http://localhost:8000/public/images/paymentProofTemplate.png`} alt='proof' width={500} height={500} className='w-full'/>
            </div>
            <div className='flex gap-2 w-full'>
                <button className="text-xdark text-base sm:text-lg bg-white transition-colors hover:bg-xwhite py-1 px-2 sm:py-1 sm:px-3 rounded-xl grow flex justify-center relative">Decline<span className={`ml-5 loading loading-dots loading-lg ${loadingDisplay}`}></span></button>
                <button className="text-white text-base sm:text-lg bg-xgreen2 transition-colors hover:bg-xgreen1 py-1 px-2 sm:py-1 sm:px-3 rounded-xl grow flex justify-center relative">Confirm<span className={`ml-5 loading loading-dots loading-lg ${loadingDisplay}`}></span></button>
            </div>
        </div>
    </dialog>
  )
}

