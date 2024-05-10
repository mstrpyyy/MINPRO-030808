<<<<<<< HEAD
import {Router} from 'express'
import { EventRouter } from './event.router'


export class ApiRouter {
=======
import {Request, Response, Router} from 'express'
import { UserRouter } from './user.router'
import { VerifyToken } from '@/middleware/token.middleware'
import { OrganizerRouter } from './organizer.router'
import { AccountRouter } from './account.router'

export class ApiRouter {
    private userRouter: UserRouter 
    private organizerRouter: OrganizerRouter
    private accountRouter: AccountRouter
>>>>>>> a6e57807033b5ed117c302904ae626b6cdd54f13
    private router: Router
    private eventRouter : EventRouter

    constructor() {
        this.router = Router()
<<<<<<< HEAD
        this.eventRouter = new EventRouter()
        this.initializeRoutes()
    }

    private initializeRoutes(): void {
        this.router.use('/events', this.eventRouter.getRouter())
=======
        this.userRouter = new UserRouter()
        this.organizerRouter = new OrganizerRouter()
        this.accountRouter = new AccountRouter()
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
>>>>>>> a6e57807033b5ed117c302904ae626b6cdd54f13
    }

    getRouter(): Router {
        return this.router
    }
}