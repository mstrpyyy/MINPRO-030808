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
            let userId
            let newUser = await prisma.user.findUnique({
                where: {
                    email
                }
            })
            if (newUser?.isActive == true) throw "email already exist"
            if (refCode.length !== 0) {
                const existingReferrals = await prisma.user.findUnique({
                    where: {
                        referral: refCode.toUpperCase(),
                        isActive: true
                    }
                })
                if (existingReferrals == null) throw "referral code does not exist"
                userId = existingReferrals.id
                
            }
            if (newUser?.isActive == false && newUser) {
                newUser = await prisma.user.update({
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
                newUser = await prisma.user.create({
                    data: {
                        name,
                        email,
                        password: hashPassword
                    }
                })
            }

            const mili = new Date().getMilliseconds().toString()
            const referralNum = mili + newUser.id
            const referralItem = name.replace(" ", "").toUpperCase().slice(0, 5) + referralNum
            const user = await prisma.user.update({
                data: {
                    referral: referralItem,
                },
                where: {
                    email: newUser.email
                }
            })
            const payload = {id: user.id, accountType: user.accountType, userId: userId}
            const token = sign(payload, process.env.KEY_JWT!, {expiresIn: '1h'})
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
                    email,
                    isActive: true
                }
            })                                                     
            if (user == null) throw "user not found"

            const isiValidPass = await compare(password, user.password)                                                                      
            if (isiValidPass == false) throw "incorrect password"
            const payload = {id: user.id, accountType: user.accountType}
            const token = sign(payload, process.env.KEY_JWT!, {expiresIn: '1d'})  

            const getPoint = await prisma.pointUser.findFirst({
                where: {
                    userId: user.id,
                    isRedeem: false
                },
            })
            if (getPoint !== null) {
                const userPoint = await prisma.pointUser.aggregate({
                        where: {
                            userId: user.id,
                            isRedeem: false
                        },
                        _sum: {
                            point: true
                        },
                        _min: {
                            expireAt: true
                        }
                    })
                const expireSoonPoint = await prisma.pointUser.aggregate({
                    where: {
                        userId: user.id,
                        expireAt: new Date(userPoint._min?.expireAt!),
                        isRedeem: false
                    },
                    _sum: {
                        point: true
                    }
                })
                return res.status(200).send({
                    status: 'ok',
                    message: 'user found',
                    token,
                    userData: {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        referral: user.referral,
                        accountType: user.accountType,
                        sumPoint: userPoint._sum.point,
                        expireSoonPoint: expireSoonPoint._sum.point,
                        expireDate: userPoint._min.expireAt,
                        profilePicture: user.profilePicture
                    }
                })
            } else {
                return res.status(200).send({
                    status: 'ok',
                    message: 'user found and has no point',
                    userData: {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        referral: user.referral,
                        sumPoint: 0,
                        accountType: user.accountType,
                    },
                    token
                })
            }
        } catch (error) {
            res.status(400).send({
                status: 'error',
                message: error
            })
        }
    }

    async getUserPoint(req: Request, res: Response) {
        try {
            const userPoint = await prisma.pointUser.findMany({
                where: {
                    userId: req.user?.id,
                    isRedeem: false
                }
            })
            res.status(200).send({
                status: 'ok',
                messsage: 'get user point success',
                userPoint
            })
        } catch (error) {
            res.status(400).send({
                status: 'error',
                message: error
            })
        }
    }
}