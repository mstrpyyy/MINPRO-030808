
import {Request, Response, Router} from 'express'
import { UserRouter } from './user.router'
import { VerifyToken } from '@/middleware/token.middleware'
import { OrganizerRouter } from './organizer.router'
import { AccountRouter } from './account.router'
import { EventRouter } from './event.router'

export class ApiRouter {
    private userRouter: UserRouter 
    private organizerRouter: OrganizerRouter
    private accountRouter: AccountRouter
    private eventRouter: EventRouter
    private router: Router

    constructor() {
        this.router = Router()
        this.userRouter = new UserRouter()
        this.organizerRouter = new OrganizerRouter()
        this.accountRouter = new AccountRouter()
        this.eventRouter = new EventRouter()
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.get('/', (req:Request, res: Response) => {
            res.status(200).send({
                status: 'ok',
                message: 'test API'
            })
        })
        this.router.use('/users', this.userRouter.getRouter())
        this.router.use('/organizers', this.organizerRouter.getRouter())
        this.router.use('/accounts', this.accountRouter.getRouter())
        this.router.use('/events', this.eventRouter.getRouter())
    }

    getRouter(): Router {
        return this.router
    }
}
