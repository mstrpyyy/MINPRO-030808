'use client'
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import * as yup from 'yup'

const registerSchema = yup.object().shape({
    password: yup.string().required('password can not be empty'),
})

export default function Reset() {
    const router = useRouter()
    const [loadingDisplay, setLoadingDisplay] = useState("hidden")
    const params = useParams()

    const toResetSuccess = () => {
        const modal = document.getElementById("my_modal_resetSuccess");
        if (modal instanceof HTMLDialogElement) {
            modal.showModal()}
    }

    const closeModal = () => {
        const modal = document.getElementById("my_modal_resetSuccess");
        if (modal instanceof HTMLDialogElement) {
            modal.close()}
    }
    
    const handleReset = async (dataSet: {password: string}) => {
        try {
            setLoadingDisplay("absolute")
            const token = Array.isArray(params.token) ? params.token[0] : params.token;
            const res = await fetch('http://localhost:8000/api/accounts/reset', {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(dataSet)
            })
            const data = await res.json()
            console.log(data);
            setLoadingDisplay("hidden")
            toResetSuccess()
            setTimeout(() => {
                closeModal()
                router.push('/')
            }, 3000);
            if (data.message.message == "jwt expired") {
                throw ("verification link expired.")
            } 
        } catch (error) {
            console.log(error)
            alert (error)
            setLoadingDisplay("hidden")
        }
    }
return (
    <div>
    <Formik
        initialValues={{
            password: "",
        }}
        validationSchema={registerSchema}
        onSubmit={(values: {password: string}, action: {resetForm: () => void}) => {
            handleReset(values)
            action.resetForm()
        }}>
        {() => {
            return (
                <div className="h-[calc(100vh-64px)] bg-xwhite justify-center items-center flex">
                    <div className={`flex flex-col items-center justify-center mx-3 bg-white rounded-2xl grow max-w-[400px] h-[500px] p-10 drop-shadow-[0_0_4px_rgba(0,0,0,0.3)]`}>
                        <Form className='flex flex-col items-center w-full gap-7 py-4'>
                            <h1 className='text-xgreen2 text-4xl sm:text-5xl mb-10 font-bold text-center text-balance'>Reset Password</h1>
                            <div className='w-full'>
                                <div  className='flex flex-col'>
                                    <label htmlFor="password" className="text-sm text-xgreen font-semibold">password</label>
                                    <Field type="password" placeholder="new password" name="password" className="bg-zinc-200 text-xl text-xdark border-b-[1px] border-xmetal focus:outline-none placeholder:text-zinc-400" />
                                </div>
                                <ErrorMessage component="div" name="password"  className="text-xmetal text-sm text-[0.7rem] fixed" />
                            </div>                                
                            <button type="submit" className="bg-xblue hover:bg-xblue1 text-white font-semibold text-2xl w-full py-2 rounded-xl mt-10 sm:mt-20 relative">Reset<span className={`ml-5 loading loading-dots loading-lg ${loadingDisplay}`}></span></button>
                        </Form>
                    </div>
                    <dialog id="my_modal_resetSuccess" className="modal">
                    <div className="modal-box flex flex-col items-center justify-center mx-3 bg-white rounded-2xl grow max-w-[400px] h-[500px] p-10 drop-shadow-[0_0_4px_rgba(0,0,0,0.3)] ">
                        <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 ">✕</button>
                        </form>
                    <h1 className='text-xgreen2 text-4xl sm:text-5xl mb-10 font-bold text-center text-balance'>Password has been reset</h1>
                    <p className="text-zinc-500 text-center">Redirecting to home.</p>
                    </div>
                    </dialog>
                </div>
            )
        }}
        </Formik>
</div>
)
}