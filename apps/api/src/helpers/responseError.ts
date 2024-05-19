import { Response } from "express"

export const responseError = (res: Response, err: any) => {
    return res.status(400).send({
        status: 'error',
        message: err
    })
}