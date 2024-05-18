import { Response, Request, query } from "express";
//import { responseError } from "@/helpers/responseError";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  log: ['query']
})

export const createTransacion = async (req: Request, res: Response) => {
    try {
        await prisma.$transaction(async (tx)=>{
          console.log(req.body)
          const ticketOrder = await tx.transaction.create({
            
            data:  {
              userId: req.body.userId,   //dari token
              eventId: req.body.eventId,
              quantity: req.body.quantity,
              transactionStatus: "Pending",
              grandTotal:req.body.grandTotal,
              currency: "IDR",  //gausah ada, semuanya pake idr soalnya
              paymentMethod: "Debit Card/Credit Card",   //gausah ada
              createdBy: "admin",  //gausah ada
              updatedBy: "admin" //gausah ada
            }
          })
        })
        res.status(201).send({
            status:'ok',
            message:'Transaction successfully created. Current status is pending transaction. Please complete your payment'
        });
    } catch (error) {
      console.log(error)
      res.status(400).send({
          status: 'error',
          message: error
      });
      //responseError (res, req)
    }
  }

  export const getTransaction = async (req: Request, res: Response) => {
    try {
      const listTransaction = await prisma.transaction.findMany()

      res.status(200).send({
        status: 'ok',
        data: listTransaction
      })
      
    } catch (error) {
      res.status(400).send({
        status:'error',
        message: error
      })
    }
  } 
