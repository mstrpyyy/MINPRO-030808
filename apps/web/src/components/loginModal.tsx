'use client'
import React from 'react'
import LoginForm from './loginForm';

export default function LoginModal({accountType}: {accountType:string}) {
const showModal = () => {
    const modal = document.getElementById("my_modal_3");
    if (modal instanceof HTMLDialogElement) {
        modal.showModal()}
    }
  return (
    <div>
        <button className={`${accountType == "null" ? "block" : "hidden"} w-20 py-1 text-white bg-xorange border-2 border-xorange hover:border-xorange1  rounded-xl font-bold hover:bg-xorange1 max-sm:hidden`} onClick={showModal}>Login</button>
        <dialog id="my_modal_3" className="modal">
        <div className="modal-box bg-black ">
            <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 ">✕</button>
            </form>
            <LoginForm />
        </div>
        <div>
        </div>
        </dialog>
    </div>
  )
}
