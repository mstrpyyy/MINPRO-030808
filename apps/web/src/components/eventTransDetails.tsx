'use client'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import TransactionLineChart from './lineChart'

interface IDetail {
    details?: []
    summary?: ISummary
}

interface ISummary {
    ticketSold?: number
    totalRevenue?: number
    totalTransaction?: number
}

export default function EventTransDetails() {
    const params = useParams()
    const [transDetail, setTransDetail] = useState<IDetail>({})
    const [filterTime, setFilterTime] = useState('year')
    const [filterType, setFilterType] = useState('transactions')

    const getTransactionDetails = async(filter:any) => {
        try {
            const res = await fetch(`http://localhost:8000/api/transactions/details/${params.slug}/?filter=${filter}`)
            const data = await res.json()
            setTransDetail(data)        
        } catch (error) {
            console.log(error);
        }

    }

    useEffect(() => {
        getTransactionDetails(filterTime)
    }, [filterTime])

  return (
    <div className='flex flex-col sm:min-w-[400px] items-center justify-center flex-1'>
        <div className='flex flex-col items-center justify-center w-full h-full'>
            <select name="filterTime" id="filterTime" value={filterTime} onChange={(e) => setFilterTime(e.target.value)}>
                <option value="year">Year</option>
                <option value="month">Month</option>
                <option value="day">Day</option>
            </select>
            <select name="filterType" id="filterType" value={filterType} onChange={(e) => setFilterType(e.target.value)}>
                <option value="transactions">transaction</option>
                <option value="tickets">tickets</option>
                <option value="revenues">revenues</option>
            </select>

            <TransactionLineChart 
            data={transDetail.details}
            dataType={filterType}
            />
            

            
        </div>

        <div className='flex justify-evenly w-full flex-wrap'>
            <div className='min-w-28'>
                <h2 className='text-center text-xgreen font-bold text-base'>Tickets Sold</h2>
                <p className='text-center text-xdark text-xl'>{transDetail.summary?.ticketSold || 0}</p>
            </div>

            <div className='min-w-28'>
                <h2 className='text-center text-xgreen font-bold text-base'>Transactions</h2>
                <p className='text-center text-xdark text-xl'>{transDetail.summary?.totalTransaction || 0}</p>
            </div>

            <div className='min-w-28'>
                <h2 className='text-center text-xgreen font-bold text-base'>Revenues</h2>
                <p className='text-center text-xdark text-xl'>Rp{Intl.NumberFormat('en-DE').format(transDetail.summary?.totalRevenue || 0)}</p>
            </div>
        </div>
    </div>
  )
}
