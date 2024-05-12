'use client'
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { MdManageAccounts } from "react-icons/md";
import { RiImageEditFill } from "react-icons/ri";
import { FaClipboardUser } from "react-icons/fa6";
import { useAppSelector } from '@/lib/features/hooks';
import ChangeImageModal from '@/components/changeImageModal';
import ChangeNameModal from '@/components/changeName';

export default function Page() {
  const [isClient, setIsClient] = useState(false)
    const account = useAppSelector((state) => state.account.value)
    

    const openModalImage = () => {
      const modal = document.getElementById("my_modal_changeImage");
      if (modal instanceof HTMLDialogElement) {
          modal.showModal()}
    }

    const openModalName = () => {
      const modal = document.getElementById("my_modal_changeName");
      if (modal instanceof HTMLDialogElement) {
          modal.showModal()}
    }

    useEffect(() => {
      setIsClient(true)
    }, [])


  return (
    <div className='m-7 w-full'>
      <div className='flex gap-2 bg-white w-full p-4 max-sm:py-2 text-xgreen2 text-3xl max-md:text-2xl max-sm:text-xl items-center rounded-2xl shadow-[0_0_5px_rgba(0,0,0,0.3)]'>
      <MdManageAccounts className='text-4xl'/>
        <h1 className=''>Account Settings</h1>
      </div>

      <div className='flex max-md:flex-col my-7 bg-white w-full p-10 text-xgreen2 text-3xl max-md:text-2xl max-sm:text-xl items-center rounded-2xl shadow-[0_0_5px_rgba(0,0,0,0.3)]'>

        <div className='flex justify-evenly w-full max-md:flex-col '>

          <div className='flex flex-col justify-between items-center grow max-w-[600px]'>
            <div className='flex items-center max-md:text-xl text-3xl text-xgreen2'>
              <RiImageEditFill />
              <p>Profile Picture</p>
            </div>
            <Image src={account?.profilePicture && isClient ? account?.profilePicture : "/images/accountLogo.png"} width={200} height={200} alt='account logo' className={`rounded-full w-auto h-auto my-5 sm:my-10 max-sm:w-[100px]`} />
            <button onClick={openModalImage} className="text-white text-lg sm:text-xl bg-xgreen2 transition-colors hover:bg-xgreen1 sm:py-2 sm:px-4 rounded-xl w-56">
              <p className=''>Change image</p>
            </button>
            <ChangeImageModal />
          </div>

          <div className="divider max-sm:hidden sm:divider-horizontal before:bg-zinc-300 after:bg-zinc-300"></div> 

          <div className='flex flex-col grow max-sm:mt-10 max-w-[600px]'>
            <div className='flex items-center justify-center max-md:text-xl  text-3xl text-xgreen2 max-sm:py-5 sm:mb-10 max-sm:border-t-2 max-sm:border-zinc-300'>
              <FaClipboardUser />
              <p>Account Informations</p>
            </div>

            <div className='flex justify-between border-b-2 border-zinc-300 shrink sm:p-2 py-2'>
              <div className='flex justify-between items-start w-full flex-col'>
                <p className='text-xgreen text-xl font-medium'>Name</p>
                <p className='text-xmetal text-lg sm:text-xl sm:pr-5 truncate'>{isClient ?account?.name : ''}</p>
              </div>
              <button onClick={openModalName} className='text-sm text-xgreen2 font-bold'>change</button>
              <ChangeNameModal />
            </div>

            <div className='flex justify-between border-b-2 border-zinc-300 shrink sm:p-2 py-2'>
              <div className='flex justify-between items-start w-full flex-col'>
                <p className='text-xgreen text-xl font-medium'>Email</p>
                <p className='text-xmetal text-lg sm:text-xl sm:pr-5 truncate'>{isClient? account?.email : ''}</p>
              </div>
              <button className='text-sm text-xgreen2 font-bold'>change</button>
            </div>

            <div className='flex justify-between border-b-2 border-zinc-300 shrink sm:p-2 py-2'>
              <div className='flex justify-between items-start w-full flex-col'>
                <p className='text-xgreen text-xl font-medium'>Password</p>
                <p className='text-xmetal text-lg sm:text-xl sm:pr-5 truncate'>••••••••••••</p>
              </div>
              <button className='text-sm text-xgreen2 font-bold'>change</button>
            </div>

          </div>
        </div>
      </div>

  
    </div>
  )
}
function getUser(token: string) {
  throw new Error('Function not implemented.');
}

function handleLogout() {
  throw new Error('Function not implemented.');
}

