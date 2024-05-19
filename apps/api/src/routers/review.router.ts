import { EventReviewController } from '@/controllers/review.controller';
import { VerifyToken } from '@/middleware/token.middleware';
import { Router } from 'express';

export class ReviewRouter {
  private router: Router;
  private eventReviewController: EventReviewController
  private verifyToken: VerifyToken

  constructor() {
    this.eventReviewController = new EventReviewController()
    this.verifyToken = new VerifyToken()
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get('/:slug', this.verifyToken.verify, this.eventReviewController.getEventReview)
    this.router.post('/:slug', this.verifyToken.verify, this.eventReviewController.createEventReview)
  }

  getRouter(): Router {
    return this.router;
  }
}
