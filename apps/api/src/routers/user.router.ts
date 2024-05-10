
import { UserController } from '@/controllers/user.controller';
import { Validator } from '@/middleware/register.validator';
import { VerifyToken } from '@/middleware/token.middleware';
import { Router } from 'express';

export class UserRouter {
  private router: Router;
  private userController: UserController
  private validator: Validator

  constructor() {
    this.userController = new UserController()
    this.validator = new Validator()
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post('/register', this.validator.validatorRegister, this.userController.createUser)
    this.router.post('/login', this.validator.validatorLogin, this.userController.loginUser)
    this.router.get('/', this.userController.getUser)
  }

  getRouter(): Router {
    return this.router;
  }
}
