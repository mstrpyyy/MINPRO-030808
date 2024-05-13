import { NextFunction, Request, Response } from "express";
import prisma from "@/prisma";



export class updatePoint {
    updatePointUser = async (req: Request, res: Response, next: NextFunction) => {
        const pointUsers = await prisma.pointUser.findMany({
          where: {
            expireAt: {
              not: ""
            }
          }
        });
        for (const pointUser of pointUsers) {
          if (pointUser.expireAt && new Date() > pointUser.expireAt) {
            await prisma.pointUser.update({
              where: {
                id: pointUser.id
              },
              data: {
                isRedeem: true
              }
            });
          }
        }
        next()
      };
}