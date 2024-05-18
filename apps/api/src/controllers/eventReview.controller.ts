import prisma from "@/prisma";
import { Request, Response } from "express";

export class EventReviewController{
    async getEventReview(req: Request, res: Response){
        try {
            const eventReview = await prisma.review.findMany()
            res.status(200).send({
                status: 'ok',
                data: eventReview
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
            await prisma.review.create({
                data : {
                    ...req.body,
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