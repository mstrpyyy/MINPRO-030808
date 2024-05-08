type User = {
    id: number
    accountType: string
    refCode?: string
    userId?: number
}

declare namespace Express {
    export interface Request {
        user?: User
    }
}

