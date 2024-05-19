'use client'
import React, { useState } from 'react'
import Cookies from 'js-cookie';
import { FaCheck } from "react-icons/fa";
import Image from 'next/image';


export default function ConfirmPaymentModal({id, image, getData, slug}: {id:number; image:string; getData: any; slug: string}) {
    const [loadingDisplay, setLoadingDisplay] = useState("hidden")
    const [isSave, setIsSave] = useState(false)


    const closeModal = () => {
        const modal = document.getElementById(`my_modal_ConfirmPayment${id}`);
        if (modal instanceof HTMLDialogElement) {
            modal.close()}
        }


    const handleConfirm = async () => {
        try {
            const res = await fetch(`http://localhost:8000/api/transactions/confirmation/${id}`,{
              method: "PATCH",
              headers: {
                "Content-Type": "application/json"
              }
            })  
            console.log(res);
            if (res.ok) {
              setIsSave(true)
              getData(slug)
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

      const handleDecline = async () => {
        try {
         
            const token = Cookies.get("token")
            const res = await fetch(`http://localhost:8000/api/transactions/decline/${id}`,{
              method: "PATCH",
              headers: {
                "Content-Type": "application/json"
              }
            })  
            console.log(res);
            if (res.ok) {
              setIsSave(true)
              getData(slug)
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
    <dialog id={`my_modal_ConfirmPayment${id}`} className="modal">
        <div className="modal-box flex flex-col bg-xdark items-center justify-center rounded-2xl max-w-[400px] drop-shadow-[0_0_4px_rgba(0,0,0,0.3)]">
            <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-zinc-300">✕</button>
            </form>
            <div className={`${isSave? 'hidden' : 'flex'} flex-col`}>  
              <div className='my-4 '>
                  <Image src={image} alt='proof' width={500} height={500} className='w-full min-h-[500px]'/>
              </div>
              <div className='flex gap-2 w-full'>
                  <button 
                    className="text-white text-base sm:text-lg bg-red-400 transition-colors hover:bg-red-300 py-1 px-2 sm:py-1 sm:px-3 rounded-xl grow flex justify-center relative"
                    onClick={handleDecline}
                    >
                      Decline
                      <span className={`ml-5 loading loading-dots loading-lg ${loadingDisplay}`}></span>
                    </button>
                  <button 
                    className="text-white text-base sm:text-lg bg-xgreen2 transition-colors hover:bg-xgreen1 py-1 px-2 sm:py-1 sm:px-3 rounded-xl grow flex justify-center relative"
                    onClick={handleConfirm}
                    >
                      Confirm
                      <span className={`ml-5 loading loading-dots loading-lg ${loadingDisplay}`}></span>
                  </button>
              </div>
            </div>
            <div className={`${isSave? 'flex' : 'hidden'} flex-col items-center justify-evenly h-[400px]`}>
                    <FaCheck className='text-xgreen3 text-9xl'/>
                    <p className='text-xgreen1 text-5xl font-semibold'>Saved</p>
            </div>
        </div>
    </dialog>
  )
}

