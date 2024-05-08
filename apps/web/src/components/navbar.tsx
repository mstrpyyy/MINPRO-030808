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

export default function Navbar() {
  const dispatch = useAppDispatch()
  const [searchEffect, setSearchEffect] = useState("flex")
  const account = useAppSelector((state) => state.account.value)
  console.log(account)

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
      getUser(token)
    }
  }, [])

  const checkOrganizer = () => {
    if (account?.accountType !== "organizer") {
      alert ("please login as organizer")
    }
  }


  return (
    <div className="navbar bg-xblue flex w-full  px-2 md:px-10 select-none sticky top-0 z-40">
      <Link href={'/'} className="hidden md:block text-xgreen3 text-2xl font-bold">Eventopia</Link>
      <Link href={'/'} className={`${searchEffect} items-center md:hidden text-xgreen font-bold text-3xl`}><TfiTicket /><p>E</p></Link>
      <div className="flex-1 max-lg:mx-8 mx-16">
        <form className="join w-full">
          <input className="input  input-bordered join-item w-full h-10 rounded-l-xl bg-xwhite focus:bg-white text-xblack focus:outline-none" onFocus={() => {setSearchEffect("hidden")}} onBlur={() => {setSearchEffect("flex")}} placeholder="Search events"/>
          <div className="dropdown dropdown-end dropdown-hover">
            <div tabIndex={0} role="button" className="bg-xgreen hover:bg-xgreen3 text-white w-20 md:w-32 h-10 flex items-center justify-evenly rounded-r-xl">
              <p>Filter</p>
              <FaCaretDown />
            </div>
            <ul tabIndex={0} className="dropdown-content z-[2] menu rounded-box w-28 bg-xmetal text-white shadow-[0_0_15px_0px_rgba(113,113,122,1)]">
              <li className="hover:bg-xgreen2 hover:font-bold w-[100%] p-2 rounded-xl">Event</li>
              <li className="hover:bg-xgreen2 hover:font-bold  w-[100%] p-2 rounded-xl">Organizer</li>
              <li className="hover:bg-xgreen2 hover:font-bold  w-[100%] p-2 rounded-xl">City</li>
            </ul>
          </div>
        </form>
      </div>
      <div className="flex">
        <div className="flex gap-4">
          <button className="text-white font-bold text-sm hover:bg-xblue1 px-4 py-2 rounded-xl max-lg:hidden block">Explore</button>
          <button  className={`${account?.accountType == "organizer"? "block" : "hidden"} text-white font-bold text-sm hover:bg-xblue1  px-4 py-2 rounded-xl max-lg:hidden block`} onClick={checkOrganizer}>Dashboard</button>
          <button  className="text-white font-bold text-sm hover:bg-xblue1  px-4 py-2 rounded-xl max-lg:hidden block" onClick={checkOrganizer}>Create event</button>
          <Link className={`${account?.accountType == null ? "block" : "hidden"} w-20 py-1 text-white border-2 border-white rounded-xl hover:bg-xblue1 max-sm:hidden text-center`} href={"/signup"}>Sign Up</Link>
          <LoginRedirectModal />
        </div>

        <div className={`${account?.accountType == null ? "hidden" : "block"} dropdown dropdown-end`}>
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img alt="Tailwind CSS Navbar component" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
              </div>
          </div>
          <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content rounded-box w-52 bg-xmetal text-white">
              <li className={`${account?.accountType == "organizer"? "block" : "hidden"} hover:bg-xgreen2 hover:font-bold rounded-xl`}><a>Dashboard</a></li>
              <li className={`${account?.accountType == "user"? "block" : "hidden"} hover:bg-xgreen2 hover:font-bold rounded-xl`}><a>Wishlist</a></li>
              <li className="hover:bg-xgreen2 hover:font-bold rounded-xl"><a>Settings</a></li>
              <li onClick={() => handleLogout()} className="hover:bg-red-500  text-red-500 hover:text-red-900 font-bold rounded-xl"><a>Logout</a></li>
          </ul>
        </div> 
        <div className={`drawer drawer-end ${searchEffect} sm:hidden`}>
          <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content">

            <label htmlFor="my-drawer-4" aria-label="open sidebar" className="btn btn-square btn-ghost">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                </label>
          </div> 
          <div className="drawer-side">
            <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
            <ul className="menu p-4 w-80 min-h-full bg-xmetal text-base-content gap-4 justify-end">
              <li><Link className={`${account?.accountType == null ? "block" : "hidden"} w-full py-1 text-white border-2 border-white rounded-xl hover:bg-xblue1 text-center`} href={"/signup"}>Sign Up</Link></li>
              <li><Link className={`${account?.accountType == null ? "block" : "hidden"} w-full py-1 text-white bg-xgreen border-2 border-xgreen hover:border-xorange1  rounded-xl font-bold hover:bg-xorange1 text-center`} href={"/signup"}>Login</Link></li>
              <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn m-1">Click</div>
              <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                <li><a>Item 1</a></li>
                <li><a>Item 2</a></li>
              </ul>
            </div>
            </ul>
          </div>
        </div>      
      </div>
    </div>
  )
}
