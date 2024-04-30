import {Router} from 'express'
import { SampleRouter } from './sample.router'

export class ApiRouter {
    private sampleRouter: SampleRouter
    private router: Router

    constructor() {
        this.router = Router()
        this.sampleRouter = new SampleRouter()
    }

    private initializeRoutes(): void {
        this.router.use('/samples', this.sampleRouter.getRouter)
    }

    getRouter(): Router {
        return this.router
    }
}