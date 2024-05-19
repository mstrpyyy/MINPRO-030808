'use client'
import React, { useRef, useState } from 'react'
import Cookies from 'js-cookie';
import { useAppDispatch } from '@/lib/features/hooks';
import { setUser } from "@/lib/features/account/account";
import { GoUpload } from "react-icons/go";
import { IoCheckmark } from "react-icons/io5";
import { FaCheck } from "react-icons/fa";


export default function ChangeImageModal() {
    const [isUpload, setIsUpload] = useState(false)
    const [isSave, setIsSave] = useState(false)
    const imageRef = useRef<HTMLInputElement>(null)
    const [image, setImage] = useState<File | null>(null) 
    const dispatch = useAppDispatch()

    const closeModal = () => {
        const modal = document.getElementById("my_modal_changeImage");
        if (modal instanceof HTMLDialogElement) {
            modal.close()}
      }

    const getUser = async(token: any) => {
        try {
          const response =  await fetch('http://localhost:8000/api/accounts/', {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`
          },
          })
          const data = await response.json()
          console.log(data);
          dispatch(setUser(data.userData))
          if (data.message.message == "jwt expired") {
            throw ("Session expired, please sign in again.")
          }
        } catch (error) {
          alert (error)
        }
      }


    const handleImageSubmit = async () => {
        try {
          const formData = new FormData()
          if (image) {
            formData.append("file", image)
          }
          const token = Cookies.get("token")
          const res = await fetch('http://localhost:8000/api/accounts/images',{
            method: "PATCH",
            body: formData,
            headers: {
              "Authorization": `Bearer ${token}`
            }
          })  
          if (res.ok) {
            getUser(token)
            setIsSave(true)
            setTimeout(() => {
              closeModal()
              setIsUpload(false)
              setIsSave(false)
            }, 1000);
          } else {
            throw res
          }
        } catch (error) {
          console.log(error);
        }
    }

    const handleChange = () => {
        if (imageRef.current && imageRef.current.files) {
            const data = imageRef.current?.files[0]
            setImage(data)
            setIsUpload(true)
        }
    }
    
  return (
    <dialog id="my_modal_changeImage" className="modal">
              <div className="modal-box flex flex-col bg-xdark items-center justify-center mx-3 rounded-2xl grow max-w-[400px] h-[500px] p-10 drop-shadow-[0_0_4px_rgba(0,0,0,0.3)] ">
                  <form method="dialog">
                  <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-zinc-300 ">✕</button>
                  </form>
                  <div className={`${isSave? 'hidden' : 'flex'} flex-col items-center`}>
                    <h1 className='text-xgreen1 text-4xl font-bold text-center text-balance'>Change Profile</h1>
                    <label className={`${isUpload ? 'bg-xgreen hover:bg-xgreen3' : 'bg-xmetal hover:bg-xgreen2'} hover:cursor-pointer my-10 text-white text-base sm:text-lg transition-colors sm:py-2 sm:px-4 w-56 h-56 rounded-full`}>
                      <div className='flex flex-col h-full justify-center items-center'>
                        <GoUpload  className={`${isUpload? 'hidden' : 'block'} text-7xl`} />
                        <IoCheckmark className={`${isUpload? 'block' : 'hidden'} text-7xl`} />
                        <p className={`${isUpload? 'hidden' : 'block'}`}>Upload Image</p>
                        <p className={`${isUpload? 'block' : 'hidden'}`}>Successfully Uploaded</p>
                      </div>
                      <input onChange={handleChange} type='file' ref={imageRef} className='text-base text-white bg-xmetal rounded-full w-56 my-5'/>
                    </label>
                    <button onClick={handleImageSubmit} className="text-white text-lg sm:text-xl bg-xgreen2 transition-colors hover:bg-xgreen1 sm:py-2 sm:px-4 rounded-xl w-56">
                      <p className=''>Save</p>
                    </button>
                  </div>
                  <div className={`${isSave? 'flex' : 'hidden'} flex-col items-center gap-7`}>
                    <FaCheck className='text-xgreen3 text-9xl'/>
                    <p className='text-xgreen1 text-5xl font-semibold'>Saved!</p>
                  </div>
              </div>
    </dialog>
  )
}
function handleLogout() {
    throw new Error('Function not implemented.');
}

