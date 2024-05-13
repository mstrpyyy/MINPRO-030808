'use client'
import { createToken, deleteToken } from "@/app/action";
import { setUser } from "@/lib/features/account/account";
import { useAppDispatch } from "@/lib/features/hooks";
import { create } from "cypress/types/lodash";
import { useParams } from "next/navigation";



export default function Verify() {
    const params = useParams()
    const dispatch = useAppDispatch()

    const handleVerify = async () => {
        try {
            const token = Array.isArray(params.token) ? params.token[0] : params.token;
            const res = await fetch('http://localhost:8000/api/accounts/verify', {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            })
            const data = await res.json()
            console.log(data);
            if (data.message.message == "jwt expired") {
                deleteToken('token', "/")
                throw ("verification link expired.")
            } else {
                dispatch(setUser(data.userData))
                createToken(token, '/')
            }
        } catch (error) {
            console.log(error)
            alert (error)
        }
    }
return (
    <div className='flex bg-xwhite justify-center items-center w-full min-h-[calc(100vh-64px)]'>
        <div className='flex flex-col items-center justify-center mx-10 gap-16 bg-white drop-shadow-[0_0_4px_rgba(0,0,0,0.3)] rounded-2xl h-[300px] shrink w-[600px] px-12'>
                <h1 className='text-xgreen text-4xl sm:text-5xl font-bold text-center'>Register your account</h1>
                <button className='bg-xblue hover:bg-xblue1 text-white font-semibold text-2xl w-full py-2 rounded-xl' onClick={handleVerify}>verify</button>
        </div>
        
    </div>
)
}

