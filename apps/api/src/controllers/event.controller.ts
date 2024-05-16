import { Request, Response } from 'express';
import prisma from '@/prisma';

export class EventController {
  async getEvent(req: Request, res: Response) {
    try {
        const event = await prisma.event.findMany({
          where: {
            organizerId: req.user?.id
          },
          include: {
            Promo : true,
            Transaction: true
          },
        })
        res.status(200).send({
            status:'ok',
            message: 'event found',
            event
        })
    } catch (err) {
      console.log(err);
        res.status(400).send({
            status: 'error',
            message: err
        })
    }
  }
  async getEventSlug (req: Request, res: Response ){
    try {
      const details = await prisma.event.findUnique({
        where:{
            slug : req.params.slug
        },
        include: {
          Promo: true,
          Transaction: true
        }
      })
      const review = await prisma.review.aggregate({
          _avg: {
              Rating: true
          },
          where: {
              event: {
                slug: req.params.slug
            }
          }
      })

      res.status(200).send({
        status : 'ok',
        message: 'details found',
        details : {
          ...details,
          averageReview: review._avg.Rating
        }
      })
    } catch (err) {
      res.status(400).send({
        status : 'error',
        message : err
      })
    }
  }



  async createEvent (req: Request, res: Response){
    try {
      const slug = req.body.name.toLowerCase().replaceAll(" ", "-")
      await prisma.event.create({
        data : {
          ...req.body,
          slug
        }
      })
      res.status(201).send({
        status :'ok',
        message : 'Event Created!'
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
