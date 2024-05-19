'use client'
import React, { useEffect, useState } from 'react'
import ConfirmPaymentModal from './confirmPaymentModal';
import { getWaitingTransactionSlug } from '@/app/action';

interface ITransaction {
  id?: number
  user?: IUser
  paidAt?: Date
  quantity?: number
  totalDiscount?: number 
  promoId?: number 
  useReferral?: boolean
  pointId?: number 
  grandTotal?: number
  promo?: IPromo
  imageUrl?: string
}

interface IUser {
  name?: string;
}

interface IPromo {
  name?: string;
  discount?: number
  discountType?: string

}
interface IData {
  transaction?: ITransaction[]
}


export default function PaymentConfirmationList({slug} : {slug: string}) {
  const [data, setData] = useState<IData>({})
  
  
  const getData = async(slug:any) => {
    try {
      const data = await getWaitingTransactionSlug(slug)
      setData(data)
      console.log(data);
    } catch (error) {
     console.log(error); 
    }
  }
  
  const openModal = (id:any) => {
    const modal = document.getElementById(`my_modal_ConfirmPayment${id}`);
    if (modal instanceof HTMLDialogElement) {
        modal.showModal()}
  }

  useEffect(() => {
    getData(slug)
  }, [])

  return (
    <div className='overflow-x-auto w-full vertical-scroll'>
      <table className="table w-96 lg:w-full">
        <thead>
          <tr className='text-xgreen'>
            <th className='w-2'></th>
            <th className='w-32 text-center'>User</th>
            <th className='text-center'>Transaction ID</th>
            <th className='text-center'>Payment Date</th>
            <th className='text-center'>Quantity</th>
            <th className='text-center min-w-40'>Discounts</th>
            <th className='text-center'>Total Deduction (IDR)</th>
            <th className='text-center'>Total (IDR)</th>
            <th className='text-center'></th>
          </tr>
        </thead>
        <tbody className={data.transaction?.length! > 0? '' : 'hidden'}>
          {
            data.transaction?.map((item, index) => {
              let d1 = new Date(item.paidAt!)
              let paymentD = d1.toDateString()
              let paymentT = d1.toTimeString().slice(0,5)
              return (
                <tr key={item.id}>
                    <th className='w-2'>{index + 1}</th>
                    <td className='text-xgreen2 font-bold max-w-32 truncate'>{item.user?.name}</td>
                    <td className='text-center text-xmetal'>#{item.id}</td>
                    <td className='text-center text-xmetal'>{paymentD}<br/>{paymentT} WIB</td>
                    <td className='text-center text-xmetal'>{item.quantity}</td>
                    <td className='text-center text-xmetal min-w-40'>
                      <div className={item.promo? 'hidden' : 'block'}>-</div>
                      <div className={`${item.promo? 'block' : 'hidden'} bg-xyellow text-white rounded-xl`}>{item.promo?.discountType == 'nominal' ? 'Rp' : ''}{item.promo?.name || ''} {item.promo?.discount}{item.promo?.discountType == 'Percent'? '%' : ''}</div>
                      <div className={`${item.promo? 'block' : 'hidden'} bg-xgreen2 text-white rounded-xl my-1`}>Referral 10%</div>
                      <div className={`${item.promo? 'block' : 'hidden'} bg-xgreen text-white rounded-xl`}>Point 10.000</div>
                    </td>
                    <td className='text-center text-xmetal'>{Intl.NumberFormat('en-DE').format(item.totalDiscount!) || '-'}</td>
                    <td className='text-center text-xmetal'>{Intl.NumberFormat('en-DE').format(item.grandTotal!)}</td>
                    <td className='text-center text-xmetal'>
                        <button onClick={() => openModal(item.id)} className='bg-xgreen2 text-white px-2 py-1 rounded-xl'>Confirm payment</button>
                        <ConfirmPaymentModal 
                        id={item.id!}
                        image={item.imageUrl!}
                        slug={slug}
                        getData={getData}/>
                    </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
      <div className={`w-full ${data.transaction?.length! > 0? 'hidden' : 'block'} text-center py-5 text-zinc-400`}>no data</div>
    </div>
  )
}
