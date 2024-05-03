type Event ={
    id: number 
}

declare namespace Express{
    export interface Request{
        event? : Event
    }
}