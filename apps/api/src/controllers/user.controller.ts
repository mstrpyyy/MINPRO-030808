import { Request, Response } from 'express';
import prisma from '@/prisma';
import {compare, genSalt, hash} from 'bcrypt'
import {sign} from 'jsonwebtoken'
import path from 'path'
import fs from 'fs'
import Handlebars from 'handlebars';
import { transporter } from '@/helpers/nodemailer';

export class UserController {
    async getUser(req: Request, res: Response) {
        try {
            const users = await prisma.user.findMany()
            res.status(200).send({
                status:'ok',
                users
            })
        } catch (error) {
            res.status(400).send({
                status:'error',
                message: error
            })
        }
    }

    async createUser(req: Request, res: Response) {

        try {
            const {name, email, password, refCode} = req.body
            const salt = await genSalt(10)
            const hashPassword = await hash(password, salt)
            let existingUsers = await prisma.user.findUnique({
                where: {
                    email
                }
            })
            if (refCode.length !== 0) {
                const existingReferrals = await prisma.user.findUnique({
                    where: {
                        referral: refCode
                    }
                })
                if (existingReferrals == null) throw "referral code does not exist"
            }
            if (existingUsers?.isActive == true) throw "email already exist"
            if (existingUsers?.isActive == false && existingUsers) {
                existingUsers = await prisma.user.update({
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
                existingUsers = await prisma.user.create({
                    data: {
                        name,
                        email,
                        password: hashPassword
                    }
                })
            }

            const mili = new Date().getMilliseconds().toString()
            const referralNum = mili + existingUsers.id
            const referralItem = name.replace(" ", "").slice(0, 7) + referralNum
            console.log(referralItem);
            const user = await prisma.user.update({
                data: {
                    referral: referralItem,
                },
                where: {
                    email: existingUsers.email
                }
            })
            const payload = {id: user.id, accountType: user.accountType, refCode: refCode}
            const token = sign(payload, process.env.KEY_JWT!, {expiresIn: '1m'})
            const link = `http://localhost:3000/signup/verify/${token}`
            const templatePath = path.join(__dirname, "../templates", "userRegister.html")
            const templateSource = fs.readFileSync(templatePath, 'utf-8')
            const compiletemplate = Handlebars.compile(templateSource)
            const html = compiletemplate({
                name: user.name,
                link
            })
            await transporter.sendMail({
                from:process.env.MAIL_USER,
                to: user.email,
                subject: "Verify your Eventopia account 📝",
                html
            })
            res.status(200).send({
                status: 'ok',
                user,
                accountType: user.accountType,
                token
            })

        } catch (error) {
            console.log(error);
            res.status(400).send({
                status: 'error',
                message: error
            })
        }
    }

    async loginUser(req: Request, res: Response) {
        try {
            const {email, password} = req.body                                                           
            const user = await prisma.user.findFirst({
                where: {
                    email
                }
            })                                                     
            if (user == null) throw "user not found"
            const isiValidPass = await compare(password, user.password)                                                                      
            if (isiValidPass == false) throw "wrong password!"
            const payload = {id: user.id, accountType: user.accountType}
            const token = sign(payload, process.env.KEY_JWT!, {expiresIn: '1d'})                                                                                                                                         
            res.status(200).send({
                status: 'ok',
                user,
                accountType: user.accountType,
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





