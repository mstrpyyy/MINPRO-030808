import { Request, Response } from 'express';
import prisma from '@/prisma';
import {compare, genSalt, hash} from 'bcrypt'
import {sign} from 'jsonwebtoken'
import path from 'path'
import fs from 'fs'
// import Handlebars from 'handlebars';
import { transporter } from '@/helpers/nodemailer';

export class OrganizerController {
    async getOrganizer(req: Request, res: Response) {
        try {
            const organizers = await prisma.organizer.findMany()
            res.status(200).send({
                status:'ok',
                organizers
            })
        } catch (error) {
            res.status(400).send({
                status:'error',
                message: error
            })
        }
    }

    
    async deleteOrganizer(req: Request, res: Response) {
        try {
            const organizer = await prisma.organizer.findUnique({
                where: {
                    id : parseInt(req.params.id)
                }
            })

            console.log(organizer)

            if(organizer === null) throw "Organizer ID is not found"

            await prisma.organizer.delete({
                where: {
                    id : parseInt(req.params.id)
                }
            });

            res.status(202).send({
                message: "Request accepted for processing"
            })
        } catch (error) {
            res.status(400).send({
                status: 'error',
                message: error
            })            
        }
    }

    async createOrganizer(req: Request, res: Response) {
        const regex = /^\s*$/
        try {
            const {name, email, password} = req.body
            const salt = await genSalt(10)
            const hashPassword = await hash(password, salt)
            let organizer = await prisma.organizer.findUnique({
                where: {
                    email
                }
            })
            if (req.body.name == "" || req.body.name.length > 1 && regex.test(req.body.name)) throw "Name is mandatory field. Please input your name."
            if (req.body.name.length < 2) throw "Your name is to short. Please input your name at least 3 characters"
            if (organizer?.isActive == true) throw "Email already exist. Please input another email."
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
            const token = sign(payload, process.env.KEY_JWT!, {expiresIn: '1h'})
            // const link = `http://localhost:3000/signup/verify/${token}`
            // const templatePath = path.join(__dirname, "../templates", "userRegister.html")
            // const templateSource = fs.readFileSync(templatePath, 'utf-8')
            // const compiletemplate = Handlebars.compile(templateSource)
            // const html = compiletemplate({
            //     name: organizer.name,
            //     link
            // })
            // await transporter.sendMail({
            //     from:process.env.MAIL_USER,
            //     to: organizer.email,
            //     subject: "Verify your Eventopia Organizer account 📝",
            //     html
            // })
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
            const organizer = await prisma.organizer.findFirst({
                where: {
                    email
                }
            })                                                     
            if (organizer == null) throw "user not found"
            const isiValidPass = await compare(password, organizer.password)                                                                      
            if (isiValidPass == false) throw "wrong password!"
            const payload = {id: organizer.id, accountType: organizer.accountType}
            const token = sign(payload, process.env.KEY_JWT!, {expiresIn: '1d'})                                                                                                                                         
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
}





