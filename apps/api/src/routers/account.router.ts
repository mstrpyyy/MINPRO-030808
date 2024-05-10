// import { AccountController } from '@/controllers/account.controller';
// import { VerifyToken } from '@/middleware/token.middleware';
// import { Router } from 'express';

// export class AccountRouter {
//   private router: Router;
//   private accountController: AccountController
//   private verifyToken: VerifyToken

//   constructor() {
//     this.accountController = new AccountController()
//     this.verifyToken = new VerifyToken()
//     this.router = Router();
//     this.initializeRoutes();
//   }

//   private initializeRoutes(): void {
//     this.router.patch('/verify', this.verifyToken.verify, this.accountController.verifyAccount)
//     this.router.get('/', this.verifyToken.verify, this.accountController.getAccount)
//   }

//   getRouter(): Router {
//     return this.router;
//   }
// }
