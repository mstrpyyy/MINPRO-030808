'use client'
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaCaretDown } from "react-icons/fa";
import { TfiTicket } from "react-icons/tfi";
import LoginRedirectModal from "./loginRedirectModal";
import Cookies from 'js-cookie'
import { deleteToken } from "@/app/action";
import { useAppDispatch, useAppSelector } from "@/lib/features/hooks";
import { setUser } from "@/lib/features/account/account";
import { useRouter } from "next/navigation";
import { HiFilter } from "react-icons/hi";

export default function Navbar() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const [searchEffect, setSearchEffect] = useState("flex")
  const account = useAppSelector((state) => state.account.value)

  const getUser = async(token: any) => {
    try {
      const response =  await fetch('http://localhost:8000/api/accounts/', {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
      },
      })
      const data = await response.json()
      console.log(data);
      dispatch(setUser(data.userData))
      if (data.message.message == "jwt expired") {
        handleLogout()
        throw ("Session expired, please sign in again.")
      }
    } catch (error) {
      alert (error)
    }
  }

  const handleLogout = () => {
    deleteToken('token', '/')
    Cookies.remove('token')
    dispatch(setUser(null))
  }

  useEffect(() => {
    const token = Cookies.get("token")
    if (token !== undefined){
      console.log(token);
      getUser(token)
    }
  }, [])

  const checkOrganizer = (key: string) => {
    if (account?.accountType !== "organizer") {
      alert ("please login as organizer")
    } else {
      router.push(key)
    }
  }

  const showModal = () => {
    const loginRedirectModal = document.getElementById("my_modal_redirect");
    if (loginRedirectModal instanceof HTMLDialogElement) {
        loginRedirectModal.showModal()
    }
}

  return (
    <div className="navbar bg-xwhite flex w-full shadow-[0_0_15px_0px_rgba(0,0,0,0.5)]  px-2 md:px-10 select-none sticky top-0 z-40">
      <Link href={'/'} className="hidden md:block text-xgreen3 text-2xl font-bold">Eventopia</Link>
      <Link href={'/'} className={`${searchEffect} items-center md:hidden text-xgreen font-bold text-3xl`}><TfiTicket /><p>E</p></Link>
      <div className="flex-1 max-lg:mx-8 mx-16">
        <form className="join w-full">
          <input className="input  input-bordered join-item w-full h-10 rounded-l-xl bg-white text-xdark focus:outline-none" onFocus={() => {setSearchEffect("hidden")}} onBlur={() => {setSearchEffect("flex")}} placeholder="Search events"/>
          <div className="dropdown dropdown-end dropdown-hover">
            <div tabIndex={0} role="button" className="bg-xgreen hover:bg-xgreen3 text-white w-10 md:w-32 h-10 flex items-center justify-evenly rounded-r-xl">
              <p className="hidden md:block">Filter</p>
              <FaCaretDown className="hidden md:block" />
              <HiFilter className="block md:hidden" />
            </div>
            <ul tabIndex={0} className="dropdown-content z-[2] menu rounded-box w-28 bg-xmetal text-white shadow-[0_0_15px_0px_rgba(0,0,0,0.5)] ">
              <li className="hover:bg-xgreen2 hover:font-bold w-[100%] p-2 rounded-xl">Event</li>
              <li className="hover:bg-xgreen2 hover:font-bold w-[100%] p-2 rounded-xl">Organizer</li>
              <li className="hover:bg-xgreen2 hover:font-bold w-[100%] p-2 rounded-xl">City</li>
            </ul>
          </div>
        </form>
      </div>
      <div className="flex">
        <div className="flex gap-4 items-center">
          <button className="text-xblue font-bold text-sm  px-4 py-2 rounded-xl max-lg:hidden block">Explore</button>
          <button  className={`${account?.accountType == "organizer"? "block" : "hidden"} text-xblue font-bold text-sm  px-4 py-2 rounded-xl max-lg:hidden block`} onClick={() => checkOrganizer('/organizers/dashboard/general')}>Dashboard</button>
          <button  className="text-xblue font-bold text-sm  px-4 py-2 rounded-xl max-lg:hidden block" onClick={() => checkOrganizer('/organizers/dashboard/create-event')}>Create event</button>
          <Link className={`${account?.accountType == null ? "block" : "hidden"} w-20 h-8 grow-0 py-1 text-white bg-xblue  hover:bg-xblue1  rounded-xl max-sm:hidden text-center`} href={"/signup"}>Sign Up</Link>
          <LoginRedirectModal />
        </div>

        <div className={`dropdown dropdown-end ${account?.accountType == null ? "sm:hidden" : "block"}`}>
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className={`w-10 rounded-full`}>
                <img alt="Tailwind CSS Navbar component" src={account?.profilePicture  ? account?.profilePicture : '/images/accountLogo.png'} className={`${account?.accountType == null ? "hidden" : "block"}`}/>
                <img alt="Tailwind CSS Navbar component" src="/images/noUserLogo.png" className={`${account?.accountType == null ? "block" : "hidden"}`}/>
              </div>
          </div>
          <ul tabIndex={0} className="mt-3 z-[1] p-2 menu menu-sm dropdown-content rounded-box w-52 bg-xmetal text-white shadow-[0_0_15px_0px_rgba(0,0,0,0.5)] ">
            <li className={`${account?.accountType ? "block" : "hidden"} hover:bg-xgreen2 hover:font-bold rounded-xl`} onClick={() => {account?.accountType == 'user' ? router.push('/users/dashboard/general') : router.push('/organizers/dashboard/general')}}><a>Dashboard</a></li>
            <li 
              onClick={() => router.push('/organizers/dashboard/event-management')} 
              className={`${account?.accountType == 'organizer' ? "block" : "hidden"} hover:bg-xgreen2 hover:font-bold rounded-xl`}><a>Event management</a>
            </li>
            <li 
              onClick={() => router.push('/users/dashboard/transactions')} 
              className={`${account?.accountType == 'user' ? "block" : "hidden"} hover:bg-xgreen2 hover:font-bold rounded-xl`}><a>Transactions</a>
            </li>
            <li 
              onClick={() => {
                account?.accountType == 'user' ? router.push('/users/dashboard/account-settings') : router.push('/organizers/dashboard/account-settings')
                }} 
              className={`${account?.accountType == null ? "hidden" : "block"} hover:bg-xgreen2 hover:font-bold rounded-xl`}><a>Account</a>
            </li>
            <li 
              onClick={() => router.push('/organizers/dashboard/create-event')} 
              className={`${account?.accountType == 'organizer' ? "block" : "hidden"} hover:bg-xgreen2 hover:font-bold rounded-xl`}><a>Create event</a>
            </li>
            <li onClick={() => handleLogout()} className={`${account?.accountType == null ? "hidden" : "block"} hover:bg-red-500  text-red-500 hover:text-white font-bold rounded-xl`}><a>log out</a></li>
            <li onClick={() => router.push('/signup')} className={`${account?.accountType == null ? "block" : "hidden"} hover:bg-xgreen2  text-xgreen1 hover:text-white font-bold rounded-xl`}><a>Sign up</a></li>
            <li onClick={() => showModal()} className={`${account?.accountType == null ? "block" : "hidden"} hover:bg-xgreen2 text-xgreen1 hover:text-white font-bold rounded-xl`}><a>log in</a></li>
          </ul>
        </div>     
      </div>
    </div>
  )
}
