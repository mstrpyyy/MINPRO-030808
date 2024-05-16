import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";


export class VerifyToken {
    verify = (req: Request, res: Response, next: NextFunction) => {
        try {
            let token = req.headers.authorization?.replace("Bearer ", "")
            if(!token) throw "token empty"
            const verifyUser = verify(token, process.env.KEY_JWT!)
            req.user = verifyUser as User
            next()
        } catch (error) {
            res.status(400).send({
                status: 'error',
                message: error
            })
        }
    }
}