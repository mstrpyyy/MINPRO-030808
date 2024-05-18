// import prisma from "@/prisma"
// import { Request, Response } from "express";

// export class EventTypeController {
//     async getEventType(req: Request, res:Response) {
//         try {
//             const eventTypes = await prisma.eventType.findMany()
//             res.status(200).send({
//                 status: 'ok',
//                 data: eventTypes
//             });
//         } catch (err) {
//             console.log(err);
            
//              res.status(400).send({
//                 status: 'error',
//                 message: err
//              })
//         }
//     }
    
//     async createEventType (req: Request, res: Response){
//         try {
//             await prisma.eventType.create({
//                 data : {
//                     ...req.body,
//                 }
//             })
//             res.status(201).send({
//                 status: 'ok',
//                 message : 'Event Type Created!'
//             })
//         } catch (err) {
//             console.log(err);

//             res.status(400).send({
//                 status : 'error',
//                 message : err
//             });
//         }
//     }
// }