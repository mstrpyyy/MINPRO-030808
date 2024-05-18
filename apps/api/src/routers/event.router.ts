import { EventController } from "@/controllers/event.controller";
// import { EventTypeController } from "@/controllers/eventType.controller";
import { Router } from "express";
import { EventReviewController } from "@/controllers/eventReview.controller";

export class EventRouter{
    private router : Router
    private eventController : EventController
    private eventReviewController : EventReviewController
    // private eventTypeController : EventTypeController

    constructor () {
        this.eventController = new EventController
        // this.eventTypeController = new EventTypeController
        this.eventReviewController = new EventReviewController
        this.router = Router()
        this.initializeRouter()
    }
    private initializeRouter () : void {
        this.router.get('/', this.eventController.getEvent)
        // this.router.get('/type',this.eventTypeController.getEventType)
        // this.router.post('/type',this.eventTypeController.createEventType)
        this.router.get('/review',this.eventReviewController.getEventReview)
        this.router.get('/:slug', this.eventController.getEventSlug)
        this.router.post('/', this.eventController.createEvent)
        this.router.post('/review',this.eventReviewController.createEventReview)
    }
    getRouter() : Router{
        return this.router
    }
}