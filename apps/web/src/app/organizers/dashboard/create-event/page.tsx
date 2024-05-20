'use client'
import { values } from "cypress/types/lodash"
import { ErrorMessage, Field, Form, Formik } from "formik"
import { useRouter } from "next/router"
import React, {useState} from 'react'
import * as yup from 'yup'
const eventCreateSchema = yup.object().shape({
    name: yup.string()
        .required('Name is reqired')
})

export default function eventCreate() {
    const handleEventCreate = async (dataSet: { name: string,  startSale: Date, eventDate: Date, price: number, category: string, city: string, address: string, initialTickets: number, description: string }) => {
        try {
            const response = await fetch('http://localhost:8000/api/event', {
                method: "POST",
                headers: {
                    "content-Type": "application/json",
                    "Authorization" : ""
                },
                body: JSON.stringify(dataSet)
            })
            const data = await response.json()
            if (data.status != "ok") {
                throw data
            } else {
              alert ("event successfully created")
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
                      name: "",
                      startSale: new Date(),
                      eventDate: new Date(),
                      price: 0,
                      category: "",
                      city: "",
                      address: "",
                      initialTickets: 0,
                      description: ""
                  }}
                  validationSchema={eventCreateSchema}
                  onSubmit={(values: {
                      name: string,
                      startSale: Date,
                      eventDate: Date,
                      price: number, 
                      category: string,
                      city: string,
                      address: string,
                      initialTickets: number,
                      description: string
                  },
                      action: { resetForm: () => void }) => {
                      console.log(values);
                      handleEventCreate(values)
                      action.resetForm()
                  }}>
                    {() => {
                    return (
                        <div className='p-2 xl:p-7 w-full'>
                            <div className='flex flex-col items-center justify-center grow'>
                                <h1 className='text-xgreen2 text-4xl sm:text-5xl font-bold mb-10 sm:mb-20 text-center'>Create Event</h1>
                                <Form className='flex flex-col items-center w-full gap-7'>
                                <div className='w-full'>
                                        <div className='flex flex-col'>
                                            <label htmlFor="name" className="text-sm text-xgreen font-semibold">Name</label>
                                            <Field type="name" placeholder="Company name" name="name" className="bg-zinc-200 text-xl text-xdark border-b-[1px] border-xmetal focus:outline-none placeholder:text-zinc-400" />
                                        </div>
                                        <ErrorMessage component="div" name="name" className="text-xmetal text-sm text-[0.7rem] block" />
                                    </div>
                                    <div className='w-full'>
                                        <div className='flex flex-col'>
                                            <label htmlFor="startSale" className="text-sm text-xgreen font-semibold">Start Sale</label>
                                            <Field type="date" placeholder="Company startSale" name="startSale" className="bg-zinc-200 text-xl text-xdark border-b-[1px] border-xmetal focus:outline-none placeholder:text-zinc-400" />
                                        </div>
                                        <ErrorMessage component="div" name="startSale" className="text-xmetal text-sm text-[0.7rem] block" />
                                    </div>
                                    <div className='w-full'>
                                        <div className='flex flex-col'>
                                            <label htmlFor="eventDate" className="text-sm text-xgreen font-semibold">Even Date</label>
                                            <Field type="date" placeholder="Company eventDate" name="eventDate" className="bg-zinc-200 text-xl text-xdark border-b-[1px] border-xmetal focus:outline-none placeholder:text-zinc-400" />
                                        </div>
                                        <ErrorMessage component="div" name="eventDate" className="text-xmetal text-sm text-[0.7rem] block" />
                                    </div>
                                    <div className='w-full'>
                                            <div className='flex flex-col'>
                                                <label htmlFor="price" className="text-sm text-xgreen font-semibold">Price</label>
                                                <Field type="price" placeholder="Company price" name="price" className="bg-zinc-200 text-xl text-xdark border-b-[1px] border-xmetal focus:outline-none placeholder:text-zinc-400" />
                                            </div>
                                            <ErrorMessage component="div" name="price" className="text-xmetal text-sm text-[0.7rem] block" />
                                    </div>
                                    <div className='w-full'>
                                            <div className='flex flex-col'>
                                                <label htmlFor="category" className="text-sm text-xgreen font-semibold">Category</label>
                                                <Field type="category" placeholder="Company category" name="category" className="bg-zinc-200 text-xl text-xdark border-b-[1px] border-xmetal focus:outline-none placeholder:text-zinc-400" />
                                            </div>
                                            <ErrorMessage component="div" name="category" className="text-xmetal text-sm text-[0.7rem] block" />
                                    </div> 
                                    <div className='w-full'>
                                            <div className='flex flex-col'>
                                                <label htmlFor="city" className="text-sm text-xgreen font-semibold">City</label>
                                                <Field type="city" placeholder="Company city" name="city" className="bg-zinc-200 text-xl text-xdark border-b-[1px] border-xmetal focus:outline-none placeholder:text-zinc-400" />
                                            </div>
                                            <ErrorMessage component="div" name="city" className="text-xmetal text-sm text-[0.7rem] block" />
                                    </div>
                                    <div className='w-full'>
                                            <div className='flex flex-col'>
                                                <label htmlFor="address" className="text-sm text-xgreen font-semibold">address</label>
                                                <Field type="address" placeholder="Company address" name="address" className="bg-zinc-200 text-xl text-xdark border-b-[1px] border-xmetal focus:outline-none placeholder:text-zinc-400" />
                                            </div>
                                            <ErrorMessage component="div" name="adress" className="text-xmetal text-sm text-[0.7rem] block" />
                                    </div>
                                    <div className='w-full'>
                                            <div className='flex flex-col'>
                                                <label htmlFor="initialTickets" className="text-sm text-xgreen font-semibold">Tickets</label>
                                                <Field type="initialTickets" placeholder="Company initialTickets" name="initialTickets" className="bg-zinc-200 text-xl text-xdark border-b-[1px] border-xmetal focus:outline-none placeholder:text-zinc-400" />
                                            </div>
                                            <ErrorMessage component="div" name="initialTickets" className="text-xmetal text-sm text-[0.7rem] block" />
                                    </div>
                                    <div className='w-full'>
                                            <div className='flex flex-col'>
                                                <label htmlFor="description" className="text-sm text-xgreen font-semibold">Description </label>
                                                <Field type="description" placeholder="Company description" name="description" className="bg-zinc-200 text-xl text-xdark border-b-[1px] border-xmetal focus:outline-none placeholder:text-zinc-400" />
                                            </div>
                                            <ErrorMessage component="div" name="description" className="text-xmetal text-sm text-[0.7rem] block" />
                                    </div>
                                    <button type="submit" className="bg-xblue hover:bg-xblue1 text-white font-semibold text-2xl w-full py-2 rounded-xl mt-10 sm:mt-20 relative">Create</button> 
                                </Form>
                            </div>
                        </div>
                    )
                }}

            </Formik>
        </div>
    )
}; 