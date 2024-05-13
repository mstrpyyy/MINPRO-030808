'use client'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import React, { useState } from 'react'
import * as yup from 'yup'
import Cookies from 'js-cookie';
import { BsSendCheckFill } from "react-icons/bs";

const registerSchema = yup.object().shape({
    email: yup.string().email('invalid email').required('name can not be empty'),
})


export default function ChangeEmailModal() {
    const [isSave, setIsSave] = useState(false)
    const [loadingDisplay, setLoadingDisplay] = useState("hidden")

    const closeModal = () => {
        const modal = document.getElementById("my_modal_changeEmail");
        if (modal instanceof HTMLDialogElement) {
            modal.close()}
        }


    const handleSave = async (dataSet: {email: string}) => {
        try {
            setLoadingDisplay("absolute")
            const token = Cookies.get("token")
            console.log(token);
            console.log(dataSet)
            const res = await fetch('http://localhost:8000/api/accounts/change-email',{
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
              },
              body: JSON.stringify(dataSet)
            })  
            const data = await res.json()
            console.log(data);
            if (data.status == "ok") {
                setLoadingDisplay('hidden')
                setIsSave(true)
                setTimeout(() => {
                closeModal()
                setIsSave(false)
                }, 3000);
            } else if (data.message) {
              alert (data.message)
            }
          } catch (error) {
            console.log(error);
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
                handleSave(values)
                action.resetForm()
            }}>
            {() => {
                return (
                    <dialog id="my_modal_changeEmail" className="modal">
                        <div className="modal-box flex flex-col bg-xdark items-center justify-center rounded-2xl max-w-[400px] h-[500px] drop-shadow-[0_0_4px_rgba(0,0,0,0.3)]">
                            <form method="dialog">
                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 ">✕</button>
                            </form>
                            <div className={`${isSave? 'hidden' : 'flex'} flex-col items-center w-full px-5`}>
                                <h1 className='text-xgreen1 text-4xl font-bold text-center text-balance'>Change Email</h1>
                                <Form className='flex flex-col items-center w-full'>
                                    <div className='w-full my-28'>
                                        <div  className='flex flex-col'>
                                            <label htmlFor="email" className="text-base text-xgreen font-semibold ml-4"></label>
                                            <Field type="email" placeholder="New email" name="email" className="bg-xmetal text-white text-xl rounded-full py-2 px-5 focus:outline-none placeholder:text-zinc-400" />
                                        </div>
                                        <ErrorMessage component="div" name="email"  className="text-zinc-400 text-sm text-[0.7rem] fixed" />
                                    </div>                               
                                    <button type="submit" className="text-white text-lg sm:text-xl bg-xgreen2 transition-colors hover:bg-xgreen1 sm:py-2 sm:px-4 rounded-xl w-full relative">Save<span className={`ml-2 loading loading-dots loading-md ${loadingDisplay}`}></span></button>
                                </Form>
                            </div>
                            <div className={`${isSave? 'flex' : 'hidden'} flex-col items-center gap-7`}>
                                <BsSendCheckFill  className='text-xgreen3 text-9xl'/>
                                <p className='text-xgreen1 text-3xl font-semibold'>Verify your new email</p>
                                <p className='text-white text-xl font-semibold'>Check your inbox</p>
                            </div>
                        </div>
                    </dialog>
                )
            }}
        </Formik>
    </div>
  )
}

