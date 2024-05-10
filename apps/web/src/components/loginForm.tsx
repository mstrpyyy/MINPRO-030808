'use client'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { useRouter } from 'next/navigation'
import { Router } from 'next/router'
import React from 'react'
import * as yup from 'yup'

const registerSchema = yup.object().shape({
    email: yup.string().email('invalid email').required('email can not be empty'),
    password: yup.string().min(6, 'password must contains at least 6 characters').required('password can not be empty')
})

export default function LoginForm() {
    const router = useRouter()
    const closeModal = () => {
        const modal = document.getElementById("my_modal_3");
        if (modal instanceof HTMLDialogElement) {
            modal.close()}
        }


    const onLogin = async (dataSet: {email: string, password: string}) => {
        try {
            const response = await fetch('http://localhost:8000/api/users/login', {
                method: "POST",
                headers: {
                    "content-Type": "application/json"
                },
                body: JSON.stringify(dataSet)
            })
            const data = await response.json()
            localStorage.setItem("token", data.token)
            if (data.status != "ok") {
                throw data
            } else {
                closeModal()
                router.refresh()
            }
        } catch (error: any) {
            console.log(error)
            alert (error.message)
        }
    }

  return (
    <div>
        <Formik
            initialValues={{
                email: "",
                password: ""
            }}
            validationSchema={registerSchema}
            onSubmit={(values: {email: string, password: string}, action: {resetForm: () => void}) => {
                console.log(values);
                onLogin(values)
                action.resetForm()
            }}>
            {() => {
                return (
                    <Form>
                        <div>
                            <label htmlFor="email" className="hidden"></label>
                            <Field type="email" placeholder="Your email" name="email" className=" w-[100%] h-12 bg-black border-zinc-500 border-2 px-2 rounded-md text-white focus:border-sky-500" />
                            <ErrorMessage component="div" name="email"  className="text-white text-[0.7rem] pl-3 fixed" />
                        </div>

                        <div>
                            <label htmlFor="password" className="hidden"></label>
                            <Field type="password" placeholder="Your password" name="password" className=" w-[100%] h-12 bg-black border-zinc-500 border-2 px-2 rounded-md text-white focus:border-sky-500" />
                            <ErrorMessage component="div" name="password"  className="text-white text-[0.7rem] pl-3 fixed" />
                        </div>
                        <button type="submit" className="w-[100%] bg-sky-500 text-white h-12 rounded-md transition-colors hover:bg-sky-600">Register</button>
                    </Form>
                )
            }}
            </Formik>
    </div>
  )
}
function closeModal() {
    throw new Error('Function not implemented.')
}

