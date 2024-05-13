'use client'
import { useAppSelector } from '@/lib/features/hooks';
import Image from 'next/image';

export default function DashboardOwnerCard() {
    const account = useAppSelector((state) => state.account.value);

      
  return (
    <div className="w-full px-4 py-2 flex items-center rounded-2xl gap-4 max-lg:hidden">
          <Image
            alt="orgLogo"
            width={650}
            height={650}
            src={account?.profilePicture ? account?.profilePicture : '/images/accountLogo.png'}
            className="w-14 rounded-full border-2 border-zinc-200"
          ></Image>
          <div className="flex w-full justify-between flex-col">
            <div className="flex flex-col">
              <p className="text-base text-white">Dashboard</p>
              <h1 className="text-2xl text-white font-bold h-10">{account?.name}</h1>
            </div>
          </div>
        </div>
  )
}
