'use client'
import { getUserPoint } from '@/app/action'
import React, { useEffect, useState } from 'react'

interface IDetail {
    id?: number
    expireAt?: Date
    point?: number
}

interface IData {
    userPoint?: IDetail[]
}

export default function PointDetail() {
    const [data, setData] = useState<IData>({})

    const getData = async() => {
        const res = await getUserPoint()
        setData(res)
    }

    useEffect(() => {
        getData()
    }, [])


  return (
    <dialog id="my_modal_pointDetail" className="modal">
        <div className="modal-box flex flex-col bg-xdark items-center justify-center rounded-2xl max-w-[400px] h-[500px] drop-shadow-[0_0_4px_rgba(0,0,0,0.3)]">
            <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-zinc-300 ">✕</button>
            </form>
            <div className={`flex-col items-center grow w-full px-5`}>
                <h1 className='text-xgreen1 text-4xl font-bold text-center text-balance my-7'>Your Points</h1>
                <div className='flex flex-col justify-center items-center'>
                    {data.userPoint?.map((item:any) => {
                        const d = new Date(item.expireAt)
                        const expireDate = d.toDateString()
                        return (
                            <div className='flex max-sm:flex-col w-full justify-between items-center px-4 text-white bg-xyellow py-2 mb-4 rounded-xl' key={item.id}>
                                <p className='text-3xl'>{Intl.NumberFormat('en-DE').format(item.point)} <span className='text-sm'>pts</span></p>
                                <div className='flex flex-col items-center justify-center '>
                                    <p className='text-xs font-light'>available till</p>
                                    <p className='text-base'>{expireDate}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
         <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
    </dialog>
  )
}
