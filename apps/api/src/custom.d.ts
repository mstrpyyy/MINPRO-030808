type User = {
    id: number
    accountType: string
    refCode?: string
    userId?: number
    email?: string
}

type Transaction = {
    id: number
}

type Event = {
    id: number
} 

declare namespace Express {
    export interface Request {
        user?: User
        transaction?: Transaction
        event?: Event
    }

}

