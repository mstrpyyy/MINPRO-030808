import { TransactionController } from '@/controllers/transaction.controllers';
import { uploader } from '@/helpers/uploader';
import { VerifyToken } from '@/middleware/token.middleware';
import { Router } from 'express';

export class TransactionRouter {
  private router: Router;
  private transactionController: TransactionController
  private verifyToken: VerifyToken

  constructor() {
    this.router = Router();
    this.transactionController = new TransactionController()
    this.verifyToken = new VerifyToken()
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get('/details/:slug',  this.transactionController.getTransactionDetails)
    this.router.get('/user-transactions', this.verifyToken.verify, this.transactionController.getUserTransaction)
    this.router.post('/', this.verifyToken.verify, this.transactionController.createTransactions)
    this.router.patch('/payment-upload/:slug',  this.verifyToken.verify, uploader("IMG", "/images").single('file'), this.transactionController.paymentUpload)
    this.router.patch('/confirmation/:slug', this.transactionController.paymentConfirmation)
    this.router.patch('/decline/:slug', this.transactionController.paymentDecline)
    this.router.get('/waiting-confirmation/:slug', this.transactionController.getWaitingConfirmationSlug)
  }

  getRouter(): Router {
    return this.router;
  }
}
