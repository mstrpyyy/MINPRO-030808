import { OrganizerController } from '@/controllers/organizer.controller';
// import { VerifyToken } from '@/middleware/token.middleware';
import { Router } from 'express';

export class OrganizerRouter {
  private router: Router;
  private organizerController: OrganizerController

  constructor() {
    this.organizerController = new OrganizerController()
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post('/register', this.organizerController.createOrganizer)
    this.router.post('/login', this.organizerController.loginOrganizer)
    this.router.get('/', this.organizerController.getOrganizer)
  }

  getRouter(): Router {
    return this.router;
  }
}
