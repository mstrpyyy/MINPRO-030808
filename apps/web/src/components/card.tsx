'use client'

import React from "react"
import axios from "axios"

const baseURL = `http://localhost:8000/api/event`
export const Card = () => {
    const [events, setPost] = React.useState<any[]>([]);

    React.useEffect(() => {
        axios.get(baseURL).then((response) => {
            setPost(response.data.events);
        });
    }, []);

    if (!events) return null;

    return (
    <>
        {events.map((listEvents: any) => (
            <div className="card w-96 bg-base-100 shadow-xl grid-cols-2 gap-4">
                <figure><img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhvUAdObRio4jrBycPtHnMZeyd7jtFAJSf7xxCN_nP4_oLrpxpeD78KoDpkMrrceVLldKGyDZpyrDwIC3azr6Wr7RfpdZyisaOI1Bndf3jtKMxs_iXGsTFumJN0OW_HDfiEmVle1mDxxGKG6M0MBKUEdOI3R7_UzxB2FiOJrVph8ZQZXjgrWgiRMBpW8w/w1200-h630-p-k-no-nu/Hammersonic-Lineup.jpg" alt="Event" /></figure>
                <div className="card-body">
                    <h2 className="card-title">
                        {listEvents.name}
                        <div className="badge badge-secondary">{listEvents.category}</div>
                    </h2>
                    <p>{listEvents.description}</p>
                    <div className="card-actions justify-end">
                        <div className="badge badge-outline">Ticket Concert</div>
                        <div className="badge badge-outline">Products</div>
                    </div>
                </div>
            </div>
        ))}
    </>
    )
}
