import { EventController } from "@/controllers/event.controller";
import { VerifyToken } from "@/middleware/token.middleware";
import { Router } from "express";

export class EventRouter{
    private router : Router
    private eventController : EventController
    private verifyToken: VerifyToken

    constructor () {
        this.eventController = new EventController
        this.verifyToken = new VerifyToken()
        this.router = Router()
        this.initializeRouter()
    }
    private initializeRouter () : void {
        this.router.get('/', this.verifyToken.verify, this.eventController.getEvent)
        this.router.get('/:slug', this.verifyToken.verify, this.eventController.getEventSlug)
        this.router.post('/', this.eventController.createEvent)
    }
    getRouter() : Router{
        return this.router
    }
}