
import { UserController } from '@/controllers/user.controller';
import { updatePoint } from '@/middleware/point.middleware';
import { Validator } from '@/middleware/register.validator';
import { VerifyToken } from '@/middleware/token.middleware';
import { Router } from 'express';

export class UserRouter {
  private router: Router;
  private userController: UserController
  private validator: Validator
  private verifyToken: VerifyToken

  constructor() {
    this.userController = new UserController()
    this.validator = new Validator()
    this.verifyToken = new VerifyToken()
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post('/register', this.validator.validatorRegister, this.userController.createUser)
    this.router.post('/login', this.validator.validatorLogin, this.userController.loginUser)
    this.router.get('/', this.userController.getUser)
    this.router.get('/points', this.verifyToken.verify, this.userController.getUserPoint)
  }

  getRouter(): Router {
    return this.router;
  }
}
