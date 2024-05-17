'use client'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { useRouter } from 'next/navigation'
import { Router } from 'next/router'
import React, { useState } from 'react'
import * as yup from 'yup'

const registerSchema = yup.object().shape({
    name: yup.string()
    .matches(/^[a-zA-Z\s]*$/, 'Name can only contain letters and spaces')
    .required('Name is required')
    .test(
      'no-only-spaces-or-symbols',
      'Name cannot be only spaces or symbols',
      (value) => {
        return /^[a-zA-Z]+(?: [a-zA-Z]+)*$/.test(value);
      }
    ),
    email: yup.string().email('invalid email').required('email can not be empty'),
    password: yup.string().min(6, 'password must contains at least 6 characters')
    .required('password can not be empty')
    .matches(/^\S*$/, 'Password cannot contain spaces')
})


export default function Register() {
    const [loadingDisplay, setLoadingDisplay] = useState("hidden")
    const router = useRouter()
    const handleRegister = async (dataSet: {name: string, email: string, password: string}) => {
        try {
            setLoadingDisplay("absolute")
            const response = await fetch('http://localhost:8000/api/organizers/register', {
                method: "POST",
                headers: {
                    "content-Type": "application/json"
                },
                body: JSON.stringify(dataSet)
            })
            const data = await response.json()
            if (data.status != "ok") {
                throw data
            } else {
                router.push('/signup/waiting-verification')
            }
        } catch (error: any) {
            console.log(error)
            alert (error.message)
            setLoadingDisplay("hidden")
        }
    }

  return (
    <div>
        <Formik
            initialValues={{
                name: "",
                email: "",
                password: "",
            }}
            validationSchema={registerSchema}
            onSubmit={(values: {name: string, email: string, password: string}, action: {resetForm: () => void}) => {
                console.log(values);
                handleRegister(values)
                action.resetForm()
            }}>
            {() => {
                return (
                    <div className='flex bg-xwhite min-h-[calc(100vh-64px)] justify-center items-center'>
                        <div className='flex flex-col items-center justify-center mx-10 bg-white drop-shadow-[0_0_4px_rgba(0,0,0,0.3)] rounded-2xl h-[600px] shrink w-[480px] px-12'>
                                <h1 className='text-xgreen2 text-4xl sm:text-5xl font-bold mb-10 sm:mb-20 text-center'>Register account</h1>
                            <Form className='flex flex-col items-center w-full gap-7'>
                                    <div className='w-full'>
                                        <div  className='flex flex-col'>
                                            <label htmlFor="name" className="text-sm text-xgreen font-semibold">Name</label>
                                            <Field type="name" placeholder="Company name" name="name" className="bg-zinc-200 text-xl text-xdark border-b-[1px] border-xmetal focus:outline-none placeholder:text-zinc-400" />
                                        </div>
                                        <ErrorMessage component="div" name="name"  className="text-xmetal text-sm text-[0.7rem] fixed" />
                                    </div>
                                    <div className='w-full'>
                                        <div  className='flex flex-col'>
                                            <label htmlFor="email" className="text-sm text-xgreen font-semibold">Email</label>
                                            <Field type="email" placeholder="Company email" name="email" className="bg-zinc-200 text-xl text-xdark border-b-[1px] border-xmetal focus:outline-none placeholder:text-zinc-400" />
                                        </div>
                                        <ErrorMessage component="div" name="email"  className="text-xmetal text-sm text-[0.7rem] fixed" />
                                    </div>
                                    <div className='w-full'>
                                        <div  className='flex flex-col'>                                            
                                            <label htmlFor="password" className="text-sm text-xgreen font-semibold">Password</label>
                                            <Field type="password" placeholder="Company password" name="password" className="bg-zinc-200 text-xl text-xdark border-b-[1px] border-xmetal focus:outline-none placeholder:text-zinc-400" />
                                        </div>
                                        <ErrorMessage component="div" name="password"  className="text-xmetal text-sm text-[0.7rem] fixed" />
                                    </div>                                  
                                <button type="submit" className="bg-xblue hover:bg-xblue1 text-white font-semibold text-2xl w-full py-2 rounded-xl mt-10 sm:mt-20 relative">Register<span className={`ml-5 loading loading-dots loading-lg ${loadingDisplay}`}></span></button>
                            </Form>
                        </div>
                    </div>
                )
            }}
            </Formik>
    </div>
  )
}