'use client'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import React, { useState } from 'react'
import * as yup from 'yup'
import { MdMarkEmailRead } from "react-icons/md";

const registerSchema = yup.object().shape({
    email: yup.string().email('invalid email').required('email can not be empty'),
})


export default function OrganizerResetForm() {
    const [loadingDisplay, setLoadingDisplay] = useState("hidden")
    const [emailSent, setEmailSent] = useState("notSent")

    const closeModal = () => {
        const modal = document.getElementById("my_modal_organizerReset");
        if (modal instanceof HTMLDialogElement) {
            modal.close()}
        }


    const handleReset = async (dataSet: {email: string}) => {
        try {
            setLoadingDisplay("absolute")
            const response = await fetch(`http://localhost:8000/api/accounts/reset-verify?accountType=organizer&email=${dataSet.email}`, {
                method: "GET",
                headers: {
                    "content-Type": "application/json"
                }
            })
            const data = await response.json()
            console.log(data);
            if (data.status != "ok") {
                throw (data.message)
            } else {
                setEmailSent("sent")
                setLoadingDisplay("hidden")
                setTimeout(() => {
                    closeModal()
                    setEmailSent("notSent")
                }, 3000);
            }
        } catch (error) {
            console.log(error)
            alert (error)
            setLoadingDisplay("hidden")
        }
    }


  return (
    <div>
        <Formik
            initialValues={{
                email: "",
            }}
            validationSchema={registerSchema}
            onSubmit={(values: {email: string}, action: {resetForm: () => void}) => {
                handleReset(values)
                action.resetForm()
            }}>
            {() => {
                return (
                    <div>
                        <div className={`${emailSent == "sent" ? "hidden" : "flex"} flex-col items-center justify-center mx-3 bg-white rounded-2xl`}>
                            <Form className='flex flex-col items-center w-full gap-7 py-4'>
                                <h1 className='text-xgreen2 text-4xl font-bold text-center text-balance'>Reset Password</h1>
                                <p className='text-zinc-500 text-base mb-10 text-center'>Don't worry! We will send you email to reset your password.</p>
                                    <div className='w-full'>
                                        <div  className='flex flex-col'>
                                            <label htmlFor="email" className="text-sm text-xgreen font-semibold">Email</label>
                                            <Field type="email" placeholder="Organizer email" name="email" className="bg-zinc-200 text-xl text-xdark border-b-[1px] border-xmetal focus:outline-none placeholder:text-zinc-400" />
                                        </div>
                                        <ErrorMessage component="div" name="email"  className="text-xmetal text-sm text-[0.7rem] fixed" />
                                    </div>                                
                                <button type="submit" className="bg-xblue hover:bg-xblue1 text-white font-semibold text-2xl w-full py-2 rounded-xl mt-10 sm:mt-20 relative">Reset<span className={`ml-5 loading loading-dots loading-lg ${loadingDisplay}`}></span></button>
                            </Form>
                        </div>
                        <div className={`${emailSent == "sent" ? "flex" : "hidden"} flex-col items-center justify-center mx-3 bg-white rounded-2xl py-7`}>       

                            <p className='text-xgreen2 text-4xl font-bold text-center text-balance'>Email has been sent!</p>
                            <MdMarkEmailRead className='text-xgreen text-9xl my-5'/>
                            <p className='text-zinc-500 text-base text-center'>check your inbox.</p>
                            <button onClick={closeModal} type="submit" className="bg-xblue hover:bg-xblue1 text-white font-semibold text-2xl w-full py-2 rounded-xl mt-10 sm:mt-20 relative">
                                close
                                <span className={`ml-5 loading loading-dots loading-lg ${loadingDisplay}`}></span>
                            </button>
                        </div>
                    </div>
                )
            }}
            </Formik>
    </div>
  )
}

