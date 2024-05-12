type User = {
    id: number
    accountType: string
    refCode?: string
    userId?: number
    email?: string
}

declare namespace Express {
    export interface Request {
        user?: User
    }
}

