import { createSlice } from "@reduxjs/toolkit"

export interface AccountSlice {
    value: {
        id: number | null,
        name: string,
        email: string,
        accountType: string,
        referral?: string,
        sumPoint?: number,
        expireSoonPoint?: number,
        expireDate?: string,
        profilePicture?: string
    } | null;
}

const initialState: AccountSlice = {
    value: null
}
export const accountSlice = createSlice({
    name: "account",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.value = action.payload 
        }
    }
})

export const { setUser } = accountSlice.actions