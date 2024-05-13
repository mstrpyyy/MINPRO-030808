'use client'
import { createToken, deleteToken } from "@/app/action";
import { setUser } from "@/lib/features/account/account";
import { useAppDispatch } from "@/lib/features/hooks";
import { useParams } from "next/navigation";



export default function Verify() {
    const params = useParams()
    const dispatch = useAppDispatch()

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
            throw ("Session expired, please sign in again.")
        }
        } catch (error) {
        alert (error)
        }
    }

    const handleVerify = async () => {
        try {
            const token = Array.isArray(params.token) ? params.token[0] : params.token;
            const res = await fetch('http://localhost:8000/api/accounts/verify-email', {
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
                getUser(token)
                createToken(token, '/organizers/dashboard/account-settings')
            }
        } catch (error) {
            console.log(error)
            alert (error)
        }
    }
return (
    <div className='flex bg-xwhite justify-center items-center w-full min-h-[calc(100vh-64px)]'>
        <div className='flex flex-col items-center justify-center mx-10 gap-16 bg-white drop-shadow-[0_0_4px_rgba(0,0,0,0.3)] rounded-2xl h-[300px] shrink w-[600px] px-12'>
                <h1 className='text-xgreen text-4xl sm:text-5xl font-bold text-center'>Verify your email</h1>
                <button className='bg-xblue hover:bg-xblue1 text-white font-semibold text-2xl w-full py-2 rounded-xl' onClick={handleVerify}>verify</button>
        </div>
        
    </div>
)
}