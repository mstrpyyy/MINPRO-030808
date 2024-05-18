import { Request, Response } from 'express';
import prisma from '@/prisma';

export class EventController {
  async getEvent(req: Request, res: Response) {
    try {
        const events = await prisma.event.findMany()
        res.status(200).send({
            status:'ok',
            data: events
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
      const event = await prisma.event.findUnique({
        where:{
            slug : req.params.slug
        }
      })
      res.status(200).send({
        status : 'ok',
        data: event 
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
      const organizerIdCheck = await prisma.organizer.findUnique({
        where: {
          id: req.body.organizerId
        }
      })

      if(organizerIdCheck === null) throw "Organizer ID is not found"
      
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
