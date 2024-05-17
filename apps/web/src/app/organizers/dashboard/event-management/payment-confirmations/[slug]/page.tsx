import { getWaitingTransactionSlug } from '@/app/action';
import PaymentConfirmationList from '@/components/paymentConfirmationList';
import Link from 'next/link';
import { MdTableChart } from 'react-icons/md';
import { IoChevronBackOutline } from "react-icons/io5";


export default async function PaymentConfirmationsPage({params} : {params: {slug:string}}) {
  const data = await getWaitingTransactionSlug(params.slug) 
  console.log(data);

  return (
      <div className='overflow-x-auto p-2 xl:p-7 w-full vertical-scroll'>
        <div className='flex gap-2 bg-xdark w-full p-4 max-sm:py-2 text-xgreen1 text-3xl max-md:text-2xl max-sm:text-xl items-center rounded-2xl shadow-[0_0_5px_rgba(0,0,0,0.3)]'>
        <MdTableChart className='text-4xl'/>
          <h1 className=''>Event Management</h1>
        </div>

        <div className='my-7 py-3 px-5 md:px-10 shadow-[0_0_5px_rgba(0,0,0,0.3)] bg-white rounded-xl'>
        <div className="flex items-center justify-between border-b-2 border-b-zinc-400">
            <div className="flex items-center gap-4">
                <Link href={'/organizers/dashboard/event-management'}><IoChevronBackOutline className="text-4xl text-xgreen"/></Link>
                <div className="flex flex-col">    
                    <p className="text-xmetal text-sm md:text-base">Payment Confirmation</p>
                    <h1 className="text-xgreen2 text-xl md:text-2xl">{data.event.name}</h1>
                </div>
            </div>
            <p className="text-sm md:text-base font-bold px-2 py-1 bg-xgreen text-white rounded-xl">Available</p>
        </div>
          <PaymentConfirmationList />
        </div>
      </div>
  )
}