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
      const events = await prisma.event.findUnique({
        where:{
            slug : req.params.slug
        },
        include: {
          Promo: true
        }
      })
      res.status(200).send({
        status : 'ok',
        events
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
