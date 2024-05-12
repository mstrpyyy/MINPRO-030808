'use client'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import React, { useState } from 'react'
import * as yup from 'yup'
import { useAppDispatch } from '@/lib/features/hooks';
import Cookies from 'js-cookie';
import { setUser } from '@/lib/features/account/account';
import { FaCheck } from "react-icons/fa";

const registerSchema = yup.object().shape({
    name: yup.string().required('name can not be empty'),
})


export default function ChangeNameModal() {
    const [isSave, setIsSave] = useState(false)
    const dispatch = useAppDispatch()

    const closeModal = () => {
        const modal = document.getElementById("my_modal_changeName");
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


    const handleSave = async (dataSet: {name: string}) => {
        try {
            
            const token = Cookies.get("token")
            const res = await fetch('http://localhost:8000/api/accounts/change-name',{
              method: "PATCH",
              headers: {
                "Authorization": `Bearer ${token}`
              },
              body: JSON.stringify(dataSet)
            })  
            console.log(res);
            if (res.ok) {
              getUser(token)
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
    <div>
        <Formik
            initialValues={{
                name: "",
            }}
            validationSchema={registerSchema}
            onSubmit={(values: {name: string}, action: {resetForm: () => void}) => {
                console.log(values);
                handleSave(values)
                action.resetForm()
            }}>
            {() => {
                return (
                    <dialog id="my_modal_changeName" className="modal">
                        <div className="modal-box flex flex-col bg-xdark items-center justify-center mx-3 rounded-2xl grow max-w-[400px] h-[500px] p-10 drop-shadow-[0_0_4px_rgba(0,0,0,0.3)]">
                            <form method="dialog">
                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 ">✕</button>
                            </form>
                            <div className={`${isSave? 'hidden' : 'flex'} flex-col items-center`}>
                                <h1 className='text-xgreen1 text-4xl font-bold text-center text-balance'>Change Name</h1>
                                <Form className='flex flex-col items-center w-full gap-7'>
                                    <div className='w-full'>
                                        <div  className='flex flex-col'>
                                            <label htmlFor="name" className="text-sm text-xgreen font-semibold">Name</label>
                                            <Field type="name" placeholder="Company name" name="name" className="bg-zinc-200 text-xl text-xblack border-b-[1px] border-xmetal focus:outline-none placeholder:text-zinc-400" />
                                        </div>
                                        <ErrorMessage component="div" name="name"  className="text-xmetal text-sm text-[0.7rem] fixed" />
                                    </div>                               
                                    <button type="submit" className="bg-xblue hover:bg-xblue1 text-white font-semibold text-2xl w-full py-2 rounded-xl mt-10 sm:mt-20 relative">Save</button>
                                </Form>
                            </div>
                            <div className={`${isSave? 'flex' : 'hidden'} flex-col items-center gap-7`}>
                                <FaCheck className='text-white text-9xl'/>
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

