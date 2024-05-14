import { Request, Response } from 'express';
import prisma from '@/prisma';
import {compare, genSalt, hash} from 'bcrypt'
import {sign} from 'jsonwebtoken'
import path from 'path'
import fs from 'fs'
import Handlebars from 'handlebars';
import { transporter } from '@/helpers/nodemailer';

export class OrganizerController {
    async getOrganizer(req: Request, res: Response) {
        try {
            const organizers = await prisma.organizer.findFirst({
                where: {
                    id: req.user?.id
                }
            })
            const activeEvent = await prisma.event.count({
                where: {
                    organizerId: req.user?.id,
                    status: "Available"
                }
            })
            const scheduledEvent = await prisma.event.count({
                where: {
                    organizerId: req.user?.id,
                    status: "ComingSoon"
                }
            })
            const getTransaction = await prisma.transaction.aggregate({
                where: {
                    status: "Paid",
                    event: {
                        organizerId: req.user?.id
                    }
                },
                _sum: {
                    quantity: true,
                    grandTotal: true
                }, 
                _count: {
                    status: true
                }
            })
            const review = await prisma.review.aggregate({
                _avg: {
                    Rating: true
                },
                where: {
                    event: {
                        organizerId: req.user?.id
                    }
                }
            })
            
            res.status(200).send({
                status:'ok',
                organizers,
                activeEvent,
                scheduledEvent,
                ticketSold: getTransaction._sum.quantity,
                totalRevenue: getTransaction._sum.grandTotal,
                totalTransaction: getTransaction._count.status,
                averageReview: review._avg.Rating
            })
        } catch (error) {
            res.status(400).send({
                status:'error',
                message: error
            })
        }
    }

    async createOrganizer(req: Request, res: Response) {
        try {
            const {name, email, password} = req.body
            const salt = await genSalt(10)
            const hashPassword = await hash(password, salt)
            let organizer = await prisma.organizer.findUnique({
                where: {
                    email
                }
            })
            if (organizer?.isActive == true) throw "email already exist"
            if (organizer?.isActive == false && organizer) {
                organizer = await prisma.organizer.update({
                    data: {
                        name,
                        email,
                        password: hashPassword
                    },
                    where: {
                        email
                    }
                })
            }
            else {
                organizer = await prisma.organizer.create({
                    data: {
                        name,
                        email,
                        password: hashPassword
                    }
                })
            }
            const payload = {id: organizer.id, accountType: organizer.accountType}
            const token = sign(payload, process.env.KEY_JWT!, {expiresIn: '5m'})
            const link = `http://localhost:3000/signup/verify/${token}`
            const templatePath = path.join(__dirname, "../templates", "userRegister.html")
            const templateSource = fs.readFileSync(templatePath, 'utf-8')
            const compiletemplate = Handlebars.compile(templateSource)
            const html = compiletemplate({
                name: organizer.name,
                link
            })
            await transporter.sendMail({
                from:process.env.MAIL_USER,
                to: organizer.email,
                subject: "Verify your Eventopia Organizer account 📝",
                html
            })
            res.status(200).send({
                status: 'ok',
                organizer,
                accountType: organizer.accountType,
                token
            })

        } catch (error) {
            res.status(400).send({
                status: 'error',
                message: error
            })
        }
    }

    async loginOrganizer(req: Request, res: Response) {
        try {
            const {email, password} = req.body   
            console.log(password);                                                        
            const organizer = await prisma.organizer.findFirst({
                where: {
                    email
                }
            })                                                     
            if (organizer == null) throw "user not found"
            const isiValidPass = await compare(password, organizer.password)                                                                      
            if (isiValidPass == false) throw "incorrect password"
            const payload = {id: organizer.id, accountType: organizer.accountType}
            const token = sign(payload, process.env.KEY_JWT!, {expiresIn: '1d'})                                                                                                                                         
            res.status(200).send({
                status: 'ok',
                message: 'account found',
                token,
                userData: {
                    id: organizer.id,
                    name: organizer.name,
                    email: organizer.email,
                    accountType: organizer.accountType,
                    profilePicture: organizer.profilePicture
                }
            })
        } catch (error) {
            res.status(400).send({
                status: 'error',
                message: error
            })
        }
    }
}