import { OrganizerController } from '@/controllers/organizer.controller';
import { VerifyToken } from '@/middleware/token.middleware';
import { Router } from 'express';

export class OrganizerRouter {
  private router: Router;
  private organizerController: OrganizerController
  private verifyToken: VerifyToken

  constructor() {
    this.organizerController = new OrganizerController()
    this.verifyToken = new VerifyToken()
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post('/register', this.organizerController.createOrganizer)
    this.router.post('/login', this.organizerController.loginOrganizer)
    this.router.get('/', this.verifyToken.verify, this.organizerController.getOrganizer)
  }

  getRouter(): Router {
    return this.router;
  }
}
