import { TransactionController } from '@/controllers/transaction.controllers';
import { Router } from 'express';

export class TransactionRouter {
  private router: Router;
  private transactionController: TransactionController

  constructor() {
    this.router = Router();
    this.transactionController = new TransactionController()
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get('/details/:slug',  this.transactionController.getTransactionDetails)
  }

  getRouter(): Router {
    return this.router;
  }
}
