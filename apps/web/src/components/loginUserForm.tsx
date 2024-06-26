'use client'
import { createToken } from '@/app/action'
import { setUser } from '@/lib/features/account/account'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import * as yup from 'yup'
import UserResetForm from './userResetForm'

const registerSchema = yup.object().shape({
    email: yup.string().email('invalid email').required('email can not be empty'),
    password: yup.string().min(6, 'password must contains at least 6 characters').required('password can not be empty'),
})


export default function UserLoginForm() {
    const [loadingDisplay, setLoadingDisplay] = useState("hidden")
    const dispatch = useDispatch()

    const closeModal = () => {
        const modal = document.getElementById("my_modal_userLogin");
        if (modal instanceof HTMLDialogElement) {
            modal.close()}
        }

    const toResetUserModal = () => {
        closeModal()
        const resetModal = document.getElementById("my_modal_userReset");
        if (resetModal instanceof HTMLDialogElement) {
            resetModal.showModal()}
    }

    
    const handleLogin = async (dataSet: {email: string, password: string}) => {
        try {
            setLoadingDisplay("absolute")
            const response = await fetch('http://localhost:8000/api/users/login', {
                method: "POST",
                headers: {
                    "content-Type": "application/json"
                },
                body: JSON.stringify(dataSet)
            })
            const data = await response.json()
            console.log(data);
            dispatch(setUser(data.userData))
            createToken(data.token, '/')
            if (data.status != "ok") {
                throw (data.message)
            } else {
                closeModal()
                setLoadingDisplay("hidden")
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
                password: "",
            }}
            validationSchema={registerSchema}
            onSubmit={(values: {email: string, password: string}, action: {resetForm: () => void}) => {
                handleLogin(values)
                action.resetForm()
            }}>
            {() => {
                return (
                        <div className='flex flex-col items-center justify-center mx-3 bg-white rounded-2xl'>
                                <h1 className='text-xgreen2 text-4xl font-bold mb-10 sm:mb-20 text-center text-balance'>Login to your account</h1>
                            <Form className='flex flex-col items-center w-full gap-7'>
                                    <div className='w-full'>
                                        <div  className='flex flex-col'>
                                            <label htmlFor="email" className="text-sm text-xgreen font-semibold">Email</label>
                                            <Field type="email" placeholder="User email" name="email" className="bg-zinc-200 text-xl text-xdark border-b-[1px] border-xmetal focus:outline-none placeholder:text-zinc-400" />
                                        </div>
                                        <ErrorMessage component="div" name="email"  className="text-xmetal text-sm text-[0.7rem] fixed" />
                                    </div>
                                    <div className='w-full'>
                                        <div  className='flex flex-col'>                                            
                                            <label htmlFor="password" className="text-sm text-xgreen font-semibold">Password</label>
                                            <Field type="password" placeholder="User password" name="password" className="bg-zinc-200 text-xl text-xdark border-b-[1px] border-xmetal focus:outline-none placeholder:text-zinc-400" />
                                        </div>
                                        <ErrorMessage component="div" name="password"  className="text-xmetal text-sm text-[0.7rem] fixed" />
                                    </div>                                  
                                <button type="submit" className="bg-xblue hover:bg-xblue1 text-white font-semibold text-2xl w-full py-2 rounded-xl mt-10 sm:mt-20 relative">Login<span className={`ml-5 loading loading-dots loading-lg ${loadingDisplay}`}></span></button>
                            </Form>
                            <button onClick={toResetUserModal} className='text-zinc-500 text-sm mt-2'>Forgot password?</button>
                            <dialog id="my_modal_userReset" className="modal">
                                <div className="modal-box bg-white max-w-[350px]">
                                    <form method="dialog">
                                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-zinc-300 ">✕</button>
                                    </form>
                                    <UserResetForm />
                                </div>
                            </dialog>
                        </div>
                )
            }}
            </Formik>
    </div>
  )
}
function setPoint(userData: any): any {
    throw new Error('Function not implemented.')
}

