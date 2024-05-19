'use client'
import React from 'react'
import { GoPersonAdd } from "react-icons/go";
import { GoOrganization } from "react-icons/go";
import UserLoginForm from './loginUserForm';
import OrganizerLoginForm from './loginOrganizerForm';
import { useAppSelector } from '@/lib/features/hooks';

export default function LoginRedirectModal() {
    const account = useAppSelector((state) => state.account.value)
    const showModal = () => {
        const loginRedirectModal = document.getElementById("my_modal_redirect");
        if (loginRedirectModal instanceof HTMLDialogElement) {
            loginRedirectModal.showModal()
        }
    }

    const toLoginUserModal = () => {
        const login = document.getElementById("my_modal_redirect")
        const modal = document.getElementById("my_modal_userLogin");
        if (login instanceof HTMLDialogElement) {
            login.close()}
        if (modal instanceof HTMLDialogElement) {
            modal.showModal()}
    }

    const toLoginOrganizerModal = () => {
        const login = document.getElementById("my_modal_redirect")
        const modal = document.getElementById("my_modal_organizerLogin");
        if (login instanceof HTMLDialogElement) {
            login.close()}
        if (modal instanceof HTMLDialogElement) {
            modal.showModal()}
    }
        
  return (
    <div>
        <button className={`${account?.accountType == null ? "block" : "hidden"}  h-8 grow-0  w-20 py-1 text-white bg-xgreen  hover:bg-xgreen3  rounded-xl max-sm:hidden text-center font-semibold`} onClick={showModal}>Log in</button>
        <dialog id="my_modal_redirect" className="modal">
        <div className="modal-box bg-white max-w-[750px] pb-16">
            <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-zinc-300 ">✕</button>
            </form>
            <div className='bg-white flex flex-col items-center'>
            <h1 className='text-xgreen2 text-4xl md:text-5xl font-bold mt-7 max-sm:mb-6 text-center text-balance'>Choose your account type.</h1>
            <h2 className='text-zinc-500 text-lg md:text-xl max-sm:hidden mb-7 text-center'>Click one of the following types:</h2>
            <div className='flex shrink gap-5 md:gap-10 flex-wrap justify-center mx-7'>
                <button onClick={toLoginUserModal} className='flex flex-col justify-center items-center w-60 h-72  md:hover:drop-shadow-[0_0_7px_rgba(0,0,0,0.3)] transition-all drop-shadow-[0_0_4px_rgba(0,0,0,0.3)] rounded-xl bg-white'>
                <GoPersonAdd className='text-[12rem] text-xblue'/>
                <h3 className='text-xgreen font-normal text-2xl pb-2'>Consumer</h3>
                <p className='text-zinc-500'>Explore, save, book events.</p>
                </button>
                <dialog id="my_modal_userLogin" className="modal">
                    <div className="modal-box bg-white max-w-[350px]">
                        <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-zinc-300 ">✕</button>
                        </form>
                        <UserLoginForm />
                    </div>
                </dialog>
                <button onClick={toLoginOrganizerModal} className='flex flex-col justify-center items-center w-60 h-72 md:hover:drop-shadow-[0_0_7px_rgba(0,0,0,0.3)] transition-all  drop-shadow-[0_0_4px_rgba(0,0,0,0.3)] rounded-xl bg-white'>
                <GoOrganization className='text-[12rem] text-xblue'/>
                <h3 className='text-xgreen font-normal text-2xl pb-2'>Organizer</h3>
                <p className='text-zinc-500'>Create, manage, track events.</p>
                </button>
                <dialog id="my_modal_organizerLogin" className="modal">
                    <div className="modal-box bg-white max-w-[350px]">
                        <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-zinc-300 ">✕</button>
                        </form>
                        <OrganizerLoginForm />
                    </div>
                </dialog>
            </div>
            </div>
        </div>
        <div>
        </div>
        </dialog>
    </div>
  )
}
