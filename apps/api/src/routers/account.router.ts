import { AccountController } from '@/controllers/account.controller';
import { uploader } from '@/helpers/uploader';
import { VerifyToken } from '@/middleware/token.middleware';
import { Router } from 'express';

export class AccountRouter {
  private router: Router;
  private accountController: AccountController
  private verifyToken: VerifyToken

  constructor() {
    this.accountController = new AccountController()
    this.verifyToken = new VerifyToken()
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.patch('/verify', this.verifyToken.verify, this.accountController.verifyAccount)
    this.router.get('/', this.verifyToken.verify, this.accountController.getAccount)
    this.router.patch('/change-password', this.verifyToken.verify, this.accountController.changePassword)
    this.router.patch('/change-name', this.verifyToken.verify, this.accountController.changeName)
    this.router.post('/change-email', this.verifyToken.verify, this.accountController.changeEmail)
    this.router.patch('/verify-email', this.verifyToken.verify, this.accountController.verifyEmail)
    this.router.get('/reset-verify', this.accountController.forgotPassword_step1)
    this.router.patch('/reset', this.verifyToken.verify, this.accountController.forgotPassword_step2)
    this.router.patch('/images', this.verifyToken.verify, uploader("IMG", "/images").single('file'), this.accountController.profileUpload)
  }

  getRouter(): Router {
    return this.router;
  }
}
