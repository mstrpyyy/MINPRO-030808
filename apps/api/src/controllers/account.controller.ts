import { Request, Response } from 'express';
import prisma from '@/prisma';
import {sign} from 'jsonwebtoken'

export class AccountController {
    async verifyAccount(req: Request, res: Response) {
        const d = new Date();
        d.setHours(0)
        d.setMinutes(0)
        d.setSeconds(0)
        d.setMilliseconds(0)
        const expireDate = d.setMonth(d.getMonth() + 3);
        try {
            if (req.user?.accountType == "user") {
                let user
                if (req.user?.userId !== undefined) {
                    user = await prisma.user.update({
                        data: {
                            isRedeem: false,
                            isActive: true
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
                            isRedeem: false
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
                            isRedeem: false
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
}







