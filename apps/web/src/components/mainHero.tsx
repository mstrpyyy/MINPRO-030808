import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { MdKeyboardArrowDown } from "react-icons/md";

export default function MainHero() {
  return (
        <div id="1" className="relative w-full md:my-4">
        <div className="absolute inset-0 overflow-x-hidden">
        <Image src="/images/maincover.jpg" width={3024} height={2005} alt='foto' className={`w-full h-[300px] object-cover md:rounded-3xl z-0`}/>
        </div>
        <div className="relative z-[1] flex flex-col items-center justify-center h-[300px] md:rounded-3xl">
            <div className='flex flex-col items-center'>
                <div className='text-xl sm:text-4xl text-white text-center font-light sm:max-w-[1000px] drop-shadow-[0_0_10px_rgba(0,0,0,1)] px-6'>
                    <p data-aos="fade">
                    test
                    </p>
                </div>
            </div>
            <div className='flex flex-col items-center mt-10'>
                <Link href={`/`} data-aos="fade">
                    <MdKeyboardArrowDown className='text-amber-500 text-4xl drop-shadow-[0_0_10px_rgba(0,0,0,1)] active:text-white'/>
                </Link>
            </div>
        </div>
        </div>
  )
}
