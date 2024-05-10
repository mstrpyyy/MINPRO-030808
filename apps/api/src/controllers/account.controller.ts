// import { Request, Response } from 'express';
// import prisma from '@/prisma';
// import {compare} from 'bcrypt'
// import {sign} from 'jsonwebtoken'

// export class AccountController {
       
//     async verifyAccount(req: Request, res: Response) {
//         try {
//             if (req.user?.accountType == "user") {
//                 if (req.user?.refCode !== undefined) {
//                     await prisma.user.update({
//                         data: {
//                             isRedeem: false,
//                         },
//                         where: {
//                             id: req.user?.id
//                         }
//                     })
//                 }
//                 const user = await prisma.user.update({
//                     data: {
//                         isActive: true,
//                     },
//                     where: {
//                         id: req.user?.id
//                     }
//                 })
//                 const payload = {id: user.id, accountType: user.accountType}
//                 const token = sign(payload, process.env.KEY_JWT!, {expiresIn: '1d'})
//                 res.status(200).send({
//                     status: 'ok',
//                     message: 'user verified',
//                     user,
//                     token
//                 })
//             }
//             if (req.user?.accountType == "organizer") {
//                 const organizer = await prisma.organizer.update({
//                     data: {
//                         isActive: true,
//                     },
//                     where: {
//                         id: req.user?.id
//                     }
//                 })
//                 const payload = {id: organizer.id, accountType: organizer.accountType}
//                 const token = sign(payload, process.env.KEY_JWT!, {expiresIn: '1d'})
//                 res.status(200).send({
//                     status: 'ok',
//                     message: 'organizer verified',
//                     organizer,
//                     token
//                 }) 
//             }
//         } catch (error) {
//             res.status(400).send({
//                 status: "error",
//                 message: error
//             })
//         }
//     }

//     async getAccount(req: Request, res: Response) {
//         try {
//             if (req.user?.accountType == "user") {
//                 const account = await prisma.user.findUnique({
//                     where: {
//                         id: req.user?.id
//                     }
//                 })
//                 res.status(200).send({
//                     status: "ok",
//                     message: 'account found',
//                     account
//                 })
//             }
//             if (req.user?.accountType == "organizer") {
//                 const account = await prisma.organizer.findUnique({
//                     where: {
//                         id: req.user?.id
//                     }
//                 })
//                 res.status(200).send({
//                     status: "ok",
//                     message: 'account found',
//                     account
//                 })
//             }
//         } catch (error) {
//             res.status(400).send({
//                 status: "error",
//                 message: error
//             })      
//         }
//     }
    
// }







