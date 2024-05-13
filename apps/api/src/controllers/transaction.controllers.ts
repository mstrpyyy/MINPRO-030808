import { Response, Request } from "express";
import prisma from "@/prisma";

export class createTransacion {
  async getTransaction(req: Request, res: Response) {
    try {
        const events = await prisma.event.findMany()
        res.status(200).send({
            status:'ok',
            events
        })
    } catch (err) {
      console.log(err);
      
        res.status(400).send({
            status: 'error',
            message: err
        })
    }
  }
}

