import {Router} from 'express'
import { EventRouter } from './event.router'


export class ApiRouter {
    private router: Router
    private eventRouter : EventRouter

    constructor() {
        this.router = Router()
        this.eventRouter = new EventRouter()
        this.initializeRoutes()
    }

    private initializeRoutes(): void {
        this.router.use('/events', this.eventRouter.getRouter())
    }

    getRouter(): Router {
        return this.router
    }
}