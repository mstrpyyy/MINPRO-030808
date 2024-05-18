// import prisma from "@/prisma";
// import { Request, Response } from "express";

// export class EventDiscountController {
//     async  getEventDiscount(req: Request, res: Response){
//         try {
//             const eventDiscount = await prisma.eventDiscount.findMany()
//             res.status(200).send({
//                 status: 'ok',
//                 data: eventDiscount
//             })
//         } catch (err) {
//             console.log(err);

//             res.status(400).send({
//                 status: 'error',
//                 message: err
//             })
//         }
//     }
//     async createEventDiscount (req: Request, res: Response){
//         try {
//             await prisma.eventDiscount.create({
//                 data : {
//                     ...req.body,
//                 }
//             });
//             res.status(201).send({
//                 status: 'ok',
//                 message : 'Event Discount Created!'
//             });
//         } catch (err) {
//             console.log(err);

//             res.status(400).send({
//                 status : 'error',
//                 message : err 
//             });
//         }
//     }
// }
