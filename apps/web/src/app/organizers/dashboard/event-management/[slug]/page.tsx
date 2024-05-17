import { getEventSlug, getEvents } from "@/app/action";
import  EventTransDetails from "@/components/eventTransDetails";
import EventInfoList from "@/components/eventInfoList";
import Link from "next/link";
import { IoChevronBackOutline } from "react-icons/io5";




export default async function EventDetail({params} : {params: {slug:string}}) {
    const data = await getEventSlug(params.slug) 
    
    let d1 = new Date(data.details.startSale!)
    let d2 = new Date(data.details.eventDate!)
    let saleD = d1.toLocaleDateString()
    let saleT = d1.toTimeString().slice(0,5)
    let eventD = d2.toLocaleDateString()
    let eventT =d2.toTimeString().slice(0,5)

    return (
        <div className="p-2 xl:p-7 w-full flex items-center">  
            <div className='w-full shadow-[0_0_5px_rgba(0,0,0,0.3)] bg-white rounded-xl p-5 px-7'>
                
                <div className="flex items-center justify-between border-b-2 border-b-zinc-400">
                    <div className="flex items-center gap-4">
                        <Link href={'/organizers/dashboard/event-management'}><IoChevronBackOutline className="text-4xl text-xgreen"/></Link>
                        <div className="flex flex-col">    
                            <p className="text-xmetal text-sm md:text-base">Event Details</p>
                            <h1 className="text-xgreen2 text-xl md:text-2xl">{data.details?.name}</h1>
                        </div>
                    </div>
                    <p className="text-lg font-bold px-2 py-1 bg-xgreen text-white rounded-xl">{data.details.status}</p>
                </div>

                <div className="flex p-3 gap-16 flex-wrap-reverse max-sm:flex-col-reverse">
                    <EventInfoList 
                        name= {data.details.name}
                        eventDate= {eventD}
                        eventTime= {eventT}
                        city= {data.details.city}
                        address= {data.details.address}
                        price= {data.details.price}
                        saleDate= {saleD}
                        saleTime={saleT}
                        category= {data.details.category}
                        ticket= {data.details.availableTickets}
                        promo= {data.details.Promo}
                        description= {data.details.description}
                    />

                    < EventTransDetails />
                </div>

            </div>
        </div>
    )
}