import { Request, Response } from 'express';
import prisma from '@/prisma';
import {sign} from 'jsonwebtoken'
import { compare, genSalt, hash } from 'bcrypt';
import Handlebars from 'handlebars';
import path from 'path'
import fs from 'fs'
import { transporter } from '@/helpers/nodemailer';

export class AccountController {
    async verifyAccount(req: Request, res: Response) {
        const d = new Date();
        d.setHours(0)
        d.setMinutes(0)
        d.setSeconds(0)
        d.setMilliseconds(0)
        const expireDate = d.setMonth(d.getMonth() + 3);
        try {
            let user
            if (req.user?.accountType == "user") {
                if (req.user?.userId !== undefined) {
                    user = await prisma.user.update({
                        data: {
                            isRedeem: false,
                            isActive: true,
                            RedeemExpire: new Date(expireDate)
                        },
                        where: {
                            id: req.user?.id
                        }
                    })
                    await prisma.pointUser.create({
                        data:{
                            userId: req.user?.userId!,
                            expireAt: new Date(expireDate)
                        }
                    })
                    const userPoint = await prisma.pointUser.aggregate({
                        where: {
                            userId: req.user?.id,
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
                            expireAt: new Date(userPoint._min?.expireAt!),
                            isRedeem: false,
                            userId: user.id
                        },
                        _sum: {
                            point: true
                        }
                    })

                    
                    const payload = {id: user.id, accountType: user.accountType}
                    const token = sign(payload, process.env.KEY_JWT!, {expiresIn: '1d'})
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
                    user = await prisma.user.update({
                        data: {
                            isActive: true
                        },
                        where: {
                            id: req.user?.id
                        }
                    })
                    const payload = {id: user.id, accountType: user.accountType}
                    const token = sign(payload, process.env.KEY_JWT!, {expiresIn: '1d'})
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
            }
            
            if (req.user?.accountType == "organizer") {
                const organizer = await prisma.organizer.update({
                    data: {
                        isActive: true,
                    },
                    where: {
                        id: req.user?.id
                    }
                })
                const payload = {id: organizer.id, accountType: organizer.accountType}
                const token = sign(payload, process.env.KEY_JWT!, {expiresIn: '1d'})
                res.status(200).send({
                    status: 'ok',
                    message: 'organizer verified',
                    token,
                    userData: {
                        id: organizer.id,
                        name: organizer.name,
                        email: organizer.email,
                        accountType: organizer.accountType,
                        profilePicture: organizer.profilePicture
                    }
                }) 
            }
        } catch (error) {
            res.status(400).send({
                status: "error",
                message: error
            })
        }
    }

    async getAccount(req: Request, res: Response) {
        try {
            if (req.user?.accountType == "user") {
                const user = await prisma.user.findUnique({
                    where: {
                        id: req.user?.id
                    },
                    include: {
                        PointUser: true
                    }
                })
                const getPoint = await prisma.pointUser.findFirst({
                    where: {
                        userId: user?.id,
                        isRedeem: false
                    },
                })
                if (getPoint !== null) {
                    const userPoint = await prisma.pointUser.aggregate({
                            where: {
                                userId: user?.id,
                                isRedeem: false,
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
                            expireAt: new Date(userPoint._min?.expireAt!),
                            isRedeem: false,
                            userId: user?.id
                        },
                        _sum: {
                            point: true
                        }
                    })
                    return res.status(200).send({
                        status: 'ok',
                        message: 'user found',
                        userData: {
                            id: user?.id,
                            name: user?.name,
                            email: user?.email,
                            referral: user?.referral,
                            accountType: user?.accountType,
                            sumPoint: userPoint._sum.point,
                            expireSoonPoint: expireSoonPoint._sum.point,
                            expireDate: userPoint._min.expireAt,
                            profilePicture: user?.profilePicture
                        }
                    })
                }
                return res.status(200).send({
                    status: "ok",
                    message: 'account found',
                    userData: {
                        id: user?.id,
                        name: user?.name,
                        email: user?.email,
                        referral: user?.referral,
                        accountType: user?.accountType,
                        sumPoint: 0,
                    }

                })
            }
            if (req.user?.accountType == "organizer") {
                const account = await prisma.organizer.findUnique({
                    where: {
                        id: req.user?.id
                    }
                })
                res.status(200).send({
                    status: "ok",
                    message: 'account found',
                    userData: {
                        ...account
                    }
                })
            }
        } catch (error) {
            res.status(400).send({
                status: "error",
                message: error
            })      
        }
    }

    async getAccountType(req: Request, res: Response) {
        try {
            const accountType = req.user?.accountType
            res.status(200).send(({
                status: 'ok',
                message: 'accountType found',
                accountType
            }))
        } catch (error) {
            res.status(400).send({
                status: 'error',
                message: error
            })
        }
    }

    async changeName(req: Request, res:Response) {
        try {
            const { name } = req.body
            let account
            if (req.user?.accountType == "user") {
                account = await prisma.user.update({
                    where: {
                        id: req.user?.id
                    },
                    data: {
                        name
                    }
                })
            }
            if (req.user?.accountType == "organizer") {
                account = await prisma.organizer.update({
                    where: {
                        id: req.user?.id
                    },
                    data: {
                        name
                    }
                })
            }
            res.status(200).send({
                status: 'ok',
                message: 'name successfully changed',
                account
            })
        } catch (error) {
            res.status(400).send({
                status: 'error',
                message: error
            })
        }
    }

    async changeEmail(req: Request, res: Response) {
        try {
            const { email } = req.body
            let account 
            if (req.user?.accountType == "user") {
                account = await prisma.user.findFirst({
                    where: {
                        id: req.user?.id
                    }
                })
                if (account?.email == email) throw 'You are using this email already'
            }
            if (req.user?.accountType == "organizer") {
                account = await prisma.organizer.findFirst({
                    where: {
                        id: req.user?.id
                    }
                })
                if (account?.email == email) throw 'You are using this email already'
            }
            const payload = {id: req.user?.id, accountType: req.user?.accountType, email}
            const token = sign(payload, process.env.KEY_JWT!, {expiresIn: '10m'})
            const link = `http://localhost:3000/${req.user?.accountType}s/verify/${token}`
            const templatePath = path.join(__dirname, "../templates", "userRegister.html")
            const templateSource = fs.readFileSync(templatePath, 'utf-8')
            const compiletemplate = Handlebars.compile(templateSource)
            const html = compiletemplate({
                name: account?.name,
                link
            })
            await transporter.sendMail({
                from:process.env.MAIL_USER,
                to: email,
                subject: "Verify your new Eventopia email 📝",
                html
            })
            res.status(200).send({
                status: 'ok',
                message: 'email sent',
                token
            })
            
        } catch (error) {
            res.status(400).send({
                status: 'error',
                message: error
            })
        }
    }

    async verifyEmail(req:Request, res:Response) {
        try {
            try {
                if (req.user?.accountType == "user") {
                    await prisma.user.update({
                        where: {
                            id: req.user.id
                        },
                        data: {
                            email: req.user.email
                        }
                    })
                }
                if (req.user?.accountType == "organizer") {
                    await prisma.organizer.update({
                        where: {
                            id: req.user.id
                        },
                        data: {
                            email: req.user.email
                        }
                    })
                }
                res.status(200).send({
                    status: 'ok',
                    message: 'email successfully changed'
                })
            } catch (error) {
                res.status(400).send({
                    status: 'error',
                    message: error
                })
                
            }
        } catch (error) {
            
        }
    }

    async changePassword(req: Request, res: Response) {
        try {
            const { password, newPassword } = req.body
            if (req.user?.accountType == "user") {
                const checkPassword = await prisma.user.findFirst({
                    where: {
                        id: req.user?.id,
                    }
                })
                if (checkPassword == null) throw "account not found"
                const isValidPass = await compare(password, checkPassword.password)                                                                   
                const isSamePass = await compare(newPassword, checkPassword.password)                                                                   
                if (isValidPass == false) throw "incorrect password"
                if (isSamePass == true) throw "new password must be different"
                if (isValidPass) {
                    const salt = await genSalt(10)
                    const hashPassword = await hash(newPassword, salt)
                    await prisma.user.update({
                        data: {
                            password: hashPassword
                        },
                        where: {
                            id: req.user?.id
                        }
                    })
                    return res.status(200).send({
                        status: 'ok',
                        message: 'password successfully changed'
                    })
                }               
            }
            if (req.user?.accountType == "organizer") {
                const checkPassword = await prisma.organizer.findFirst({
                    where: {
                        id: req.user?.id,
                    }
                })
                if (checkPassword == null) throw "account not found"
                const isSamePass = await compare(newPassword, checkPassword.password)                                                                   
                const isValidPass = await compare(password, checkPassword.password)                                                                   
                if (isValidPass == false) throw "incorrect password"
                if (isSamePass == true) throw "new password must be different"
                if (isValidPass) {
                    const salt = await genSalt(10)
                    const hashPassword = await hash(newPassword, salt)
                    await prisma.organizer.update({
                        data: {
                            password: hashPassword
                        },
                        where: {
                            id: req.user?.id
                        }
                    })
                    return res.status(200).send({
                        status: 'ok',
                        message: 'password successfully changed'
                    })
                }               
            }
            
        } catch (error) {
            res.status(400).send({
                status: 'error',
                message: error
            })
        }
    }

    async forgotPassword_step1(req: Request, res: Response) {
        try {
            const { accountType, email } = req.query
            let account
            if (accountType == "user") {
                account = await prisma.user.findFirst({
                    where: {
                        email: email as string
                    }
                }) 
                if (account == null) throw 'account not found'
            }
            if (accountType == "organizer") {
                account = await prisma.organizer.findFirst({
                    where: {
                        email: email as string
                    }
                }) 
                if (account == null) throw 'account not found'
            }
            const payload = {id: account?.id, accountType}
            const token = sign(payload, process.env.KEY_JWT!, {expiresIn: '10m'})
            const link = `http://localhost:3000/reset/${token}`
            const templatePath = path.join(__dirname, "../templates", "resetPassword.html")
            const templateSource = fs.readFileSync(templatePath, 'utf-8')
            const compiletemplate = Handlebars.compile(templateSource)
            const html = compiletemplate({
                name: account?.name,
                link
            })
            await transporter.sendMail({
                from: process.env.MAIL_USER,
                to: account?.email,
                subject: "Eventopia reset password 🔐",
                html
            })
            res.status(200).send({
                status: 'ok',
                message: 'email sent',
                token
            })
        } catch (error) {
            res.status(400).send({
                status: 'error',
                message: error
            })
        }
    }

    async forgotPassword_step2(req: Request, res: Response) {
        try {
            const { password } = req.body
            const salt = await genSalt(10)
            const hashPassword = await hash(password, salt)
            if (req.user?.accountType == "user") {
                await prisma.user.update({
                    data: {
                        password: hashPassword
                    },
                    where: {
                        id: req.user?.id
                    }
                })
            }
            if (req.user?.accountType == "organizer") {
                await prisma.organizer.update({
                    data: {
                        password: hashPassword
                    },
                    where: {
                        id: req.user?.id
                    }
                })
            }
            res.status(200).send({
                status: 'ok',
                message: 'password has been reset'
            })
        } catch (error) {
            res.status(400).send({
                status: 'error',
                message: error
            })
        }
    }

    async profileUpload(req: Request, res: Response) {
        try {
            const {file} = req
            if (!file) throw "No file uploaded"
            const imageUrl = `http://localhost:8000/public/images/${file.filename}`
            if (req.user?.accountType == "user") {
                await prisma.user.update({
                    data: {
                        profilePicture: imageUrl
                    }, where: {
                        id: req.user?.id
                    }
                })
            }
            if (req.user?.accountType == "organizer") {
                await prisma.organizer.update({
                    data: {
                        profilePicture: imageUrl
                    }, where: {
                        id: req.user?.id
                    }
                })
            }
            res.status(200).send({ 
                status: 'ok',
                message: 'image successfully uploaded'
            })
        } catch (error) {
            res.status(400).send({
                status: 'error',
                message: error
            })
        }
    }
}