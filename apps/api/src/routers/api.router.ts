import {Request, Response, Router} from 'express'
import { UserRouter } from './user.router'
import { OrganizerRouter } from './organizer.router'
import { AccountRouter } from './account.router'
import { EventRouter } from './event.router'
import { TransactionRouter } from './transaction.router'
import { ReviewRouter } from './review.router'

export class ApiRouter {
    private userRouter: UserRouter 
    private organizerRouter: OrganizerRouter
    private accountRouter: AccountRouter
    private eventRouter: EventRouter
    private transactionRouter: TransactionRouter
    private reviewRouter: ReviewRouter
    private router: Router

    constructor() {
        this.router = Router()
        this.userRouter = new UserRouter()
        this.organizerRouter = new OrganizerRouter()
        this.accountRouter = new AccountRouter()
        this.eventRouter = new EventRouter()
        this.transactionRouter = new TransactionRouter()
        this.reviewRouter = new ReviewRouter()
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
        this.router.use('/transactions', this.transactionRouter.getRouter())
        this.router.use('/reviews', this.reviewRouter.getRouter())
    }

    getRouter(): Router {
        return this.router
    }
}
