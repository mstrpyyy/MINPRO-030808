'use client'

import React, { useEffect, useState } from "react"
import Link from "next/link"
import { getAllEvents } from "@/app/action"

interface IEvents {
    image: string
    name: string
    slug: string
    category: string
    availableTickets: number
    initialTickets: number
}

interface IData {
    events?: IEvents[]
}

export const Card = () => {
    const [data, setData] = useState<IData>({})

    const getData  = async() => {
        try {
            const res = await getAllEvents()
            const data = await res
            setData(data)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=> {
        getData()
    }, [])

    return (
        <>
            <div className="flex gap-10 flex-wrap justify-center my-20">
                {data.events?.map((listEvents: any) => (
                    <div className="flex card max-md:w-64 w-[450px]  bg-white  shadow-xl">
                        <figure><img src={listEvents.image} alt="Event" /></figure>
                        <div className="card-body">
                            <h2 className="card-title text-xdark">
                                {listEvents.name}
                                <div className="badge badge-secondary">{listEvents.category}</div>
                            </h2>
                            <p className="text-zinc-500">{listEvents.city}</p>
                            <p className="text-zinc-500">{listEvents.availableTickets}/{listEvents.initialTickets}</p>
                            <Link href={`/event/${listEvents.slug}`} className="card-actions btn flex items-center justify-center text-white">
                                Buy Now
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}




 