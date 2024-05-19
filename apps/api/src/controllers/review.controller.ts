import prisma from "@/prisma";
import { Request, Response } from "express";

export class EventReviewController{
    async getEventReview(req: Request, res: Response){
        try {
            const eventReview = await prisma.review.findMany({
                where:{
                    event: {
                        slug : req.params.slug
                    }
                }
            })
            const avgReview = await prisma.review.aggregate({
                where: {
                    event: {
                        slug: req.params.slug
                    }
                },
                _avg: {
                    Rating: true
                }
            })
            res.status(200).send({
                status: 'ok',
                message: 'review found',
                review: eventReview,
                avgRating: avgReview._avg.Rating
            });
        } catch (err) {
            console.log(err);

            res.status(400).send({
                status: 'error',
                message: err
            })
        }
    }
    async createEventReview (req: Request, res: Response){
        try {
            const event = await prisma.event.findFirst({
                where: {
                    slug : req.params.slug
                }
            })
            await prisma.review.create({
                data : {
                    ...req.body,
                    userId: req.user?.id,
                }
            })
            res.status(201).send({
                status:'ok',
                message : 'Event Review Created!'
            })
        } catch (err) {
            console.log(err);
            
            res.status(400).send({
                status : 'error',
                message : err
            });
        }
    }
}