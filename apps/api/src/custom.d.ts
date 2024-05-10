type User = {
    id: number
    accountType: string
    refCode?: string
    userId?: number
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

