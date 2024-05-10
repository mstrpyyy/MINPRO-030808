type Event = {
    id: number
}
declare namespace Express {
    export interface Request{
        event?: Event
    }

}
type User = {
    id: number
}
declare namespace Express {
    export interface Request{
        user?: User
    }

}