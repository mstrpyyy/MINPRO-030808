'use client'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import * as yup from 'yup'
import { useAppDispatch, useAppSelector } from '@/lib/features/hooks';
import Cookies from 'js-cookie';
import { setUser } from '@/lib/features/account/account';
import { FaCheck } from "react-icons/fa";
import OrganizerResetForm from './organizerResetForm';
import UserResetForm from './userResetForm';

const registerSchema = yup.object().shape({
    password: yup.string().min(6, 'password must contains at least 6 characters')
    .max(20, 'password must be less than 20 characters')
    .required('password can not be empty')
    .matches(/^\S*$/, 'Password cannot contain spaces'),
    newPassword: yup.string().min(6, 'password must contains at least 6 characters')
    .max(20, 'password must be less than 20 characters')
    .required('password can not be empty')
    .matches(/^\S*$/, 'Password cannot contain spaces'),
})


export default function ChangePasswordModal() {
    const [isSave, setIsSave] = useState(false)
    const [isClient, setIsClient] = useState(false)
    const dispatch = useAppDispatch()
    const account = useAppSelector((state) => state.account.value)

    const closeModal = () => {
        const modal = document.getElementById("my_modal_changePassword");
        if (modal instanceof HTMLDialogElement) {
            modal.close()}
        }

    const toResetOrganizerModal = () => {
            closeModal()
            const resetModal = document.getElementById("my_modal_organizerReset");
            if (resetModal instanceof HTMLDialogElement) {
                resetModal.showModal()}
    }

    const toResetUserModal = () => {
        closeModal()
        const resetModal = document.getElementById("my_modal_userReset");
        if (resetModal instanceof HTMLDialogElement) {
            resetModal.showModal()}
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


    const handleSave = async (dataSet: {password: string, newPassword: string}) => {
        try {
         
            const token = Cookies.get("token")
            const res = await fetch('http://localhost:8000/api/accounts/change-password', {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
              },
              body: JSON.stringify(dataSet)
            })  
            const data = await res.json()
            if (res.ok) {
              getUser(token)
              setIsSave(true)
              setTimeout(() => {
                closeModal()
                setIsSave(false)
              }, 1000);
            } else if (data.message == 'incorrect password' || data.message == 'new password must be different') {
              alert (data.message)
            }
          } catch (error) {
            console.log(error);
          }
      }

      useEffect(() => {
        setIsClient(true)
      }, [])

  return (
    <div>
        <Formik
            initialValues={{
                password: "",
                newPassword: ""

            }}
            validationSchema={registerSchema}
            onSubmit={(values: {password: string, newPassword: string}, action: {resetForm: () => void}) => {
                handleSave(values)
                action.resetForm()
            }}>
            {() => {
                return (
                    <dialog id="my_modal_changePassword" className="modal">
                        <div className="modal-box flex flex-col bg-xdark items-center justify-center rounded-2xl max-w-[400px] h-[500px] drop-shadow-[0_0_4px_rgba(0,0,0,0.3)]">
                            <form method="dialog">
                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-zinc-300 ">✕</button>
                            </form>
                            <div className={`${isSave? 'hidden' : 'flex'} flex-col items-center w-full px-5`}>
                                <h1 className='text-xgreen1 text-4xl font-bold text-center text-balance'>Change Password</h1>
                                <Form className='flex flex-col items-center w-full'>
                                    <div className='w-full mt-20'>
                                        <div  className='flex flex-col'>
                                            <label htmlFor="password" className="text-base text-xgreen font-semibold ml-4">Current password</label>
                                            <Field type="password" placeholder="current password" name="password" className="bg-xmetal text-white text-xl rounded-full py-2 px-5 focus:outline-none placeholder:text-zinc-400" />
                                        </div>
                                        <ErrorMessage component="div" name="password"  className="text-zinc-400 text-sm text-[0.7rem] fixed" />
                                    </div>

                                    <div className='w-full mt-5 mb-20'>
                                        <div  className='flex flex-col'>
                                            <label htmlFor="newPassword" className="text-base text-xgreen font-semibold ml-4">New password</label>
                                            <Field type="password" placeholder="new password" name="newPassword" className="bg-xmetal text-white text-xl rounded-full py-2 px-5 focus:outline-none placeholder:text-zinc-400" />
                                        </div>
                                        <ErrorMessage component="div" name="newPassword"  className="text-zinc-400 text-sm text-[0.7rem] fixed" />
                                    </div>                                                      
                                    <button type="submit" className="text-white text-lg sm:text-xl bg-xgreen2 transition-colors hover:bg-xgreen1 sm:py-2 sm:px-4 rounded-xl w-full">Save</button>
                                </Form>
                                    <div className={`${account?.accountType == "user" && isClient ? 'block' : 'hidden'}`}>
                                    <button onClick={toResetUserModal} className='text-zinc-400 text-sm mt-2'>Forgot password?</button>
                                        <dialog id="my_modal_organizerReset" className="modal">
                                            <div className="modal-box bg-white max-w-[350px]">
                                                <form method="dialog">
                                                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-zinc-300 ">✕</button>
                                                </form>
                                                <UserResetForm/>
                                            </div>
                                        </dialog>
                                    </div>
                                    <div className={`${account?.accountType == "organizer" && isClient ? 'block' : 'hidden'}`}>
                                    <button onClick={toResetOrganizerModal} className='text-zinc-400 text-sm mt-2'>Forgot password?</button>
                                        <dialog id="my_modal_organizerReset" className="modal">
                                            <div className="modal-box bg-white max-w-[350px]">
                                                <form method="dialog">
                                                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-zinc-300 ">✕</button>
                                                </form>
                                                <OrganizerResetForm/>
                                            </div>
                                        </dialog>
                                    </div>
                            </div>
                            <div className={`${isSave? 'flex' : 'hidden'} flex-col items-center gap-7`}>
                                <FaCheck className='text-xgreen3 text-9xl'/>
                                <p className='text-xgreen1 text-5xl font-semibold'>Saved!</p>
                            </div>
                        </div>
                    </dialog>
                )
            }}
        </Formik>
    </div>
  )
}

