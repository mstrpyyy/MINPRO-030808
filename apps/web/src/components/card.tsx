'use client'

import React, { useEffect, useState } from "react"
import Link from "next/link"
import { getAllEvents } from "@/app/action"

interface IEvents {
    image: string
    name: string
    slug: string
    category: string
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
            <div className="flex gap-10 ">
                {data.events?.map((listEvents: any) => (
                    <div className="card w-96 bg-base-100 shadow-xl">
                        <figure><img src={listEvents.image} alt="Event" /></figure>
                        <div className="card-body">
                            <h2 className="card-title">
                                {listEvents.name}
                                <div className="badge badge-secondary">{listEvents.category}</div>
                            </h2>
                            <p>{listEvents.description}</p>
                            <Link href={`/event/${listEvents.slug}`} className="card-actions btn btn-primary">
                                Buy Now
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}




 