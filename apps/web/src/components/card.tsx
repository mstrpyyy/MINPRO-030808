'use client'

import React from "react"
import axios from "axios"
import EventDetail from "@/app/event/[slug]/page"
import Link from "next/link"


const baseURL = `http://localhost:8000/api/event`
export const Card = () => {
    const [events, setPost] = React.useState<any>([]);

    React.useEffect(() => {
        axios.get(baseURL).then((response) => {
            setPost(response.data);      
        });
    }, []);

    return (
        <>
            <div className="flex gap-10 ">
                {events.data?.map((listEvents: any) => (
                    <div className="card w-96 bg-base-100 shadow-xl">
                        <figure><img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhvUAdObRio4jrBycPtHnMZeyd7jtFAJSf7xxCN_nP4_oLrpxpeD78KoDpkMrrceVLldKGyDZpyrDwIC3azr6Wr7RfpdZyisaOI1Bndf3jtKMxs_iXGsTFumJN0OW_HDfiEmVle1mDxxGKG6M0MBKUEdOI3R7_UzxB2FiOJrVph8ZQZXjgrWgiRMBpW8w/w1200-h630-p-k-no-nu/Hammersonic-Lineup.jpg" alt="Event" /></figure>
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




 


