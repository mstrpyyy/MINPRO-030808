import { Response, Request } from "express";
import prisma from "@/prisma";
import db from "@/helpers/db";
import { createEvent } from "@/services/transaction.event";
import { formatDateToLocalString } from "@/helpers/dateConverter";

export class TransactionController {
  async getTransaction(req: Request, res: Response) {
    try {
        const events = await prisma.event.findMany()
        res.status(200).send({
            status:'ok',
            events
        })
    } catch (err) {      
        res.status(400).send({
            status: 'error',
            message: err
        })
    }
  }

  async getWaitingConfirmationSlug(req: Request, res: Response) {
    try {
      const transaction = await prisma.transaction.findMany({
        where: {
          eventId: +req.params.slug,
          status: "WaitingConfirmation"
        },
        include: {
          user: {
            select: {
              name: true
            }
          },
          promo: {
            select: {
              name: true,
              discount: true,
              discountType: true
            }
          }
        }
      })

      const event = await prisma.event.findFirst({
        where: {
          id: +req.params.slug
        }
      })
      res.status(200).send({
        status: 'ok',
        message: 'transaction found',
        transaction,
        event
      })
    } catch (error) {
      res.status(400).send({
        status: 'error',
        message: error
      })
    }
  }

  async getUserTransaction(req: Request, res: Response) {
    try {
      const transaction = await prisma.transaction.findMany({
        where:{
          userId: req.user?.id
        },
        include: {
          event: {
            select: {
              name: true,
              eventDate: true
            }
          }
        }
      })
  
      const successTrans = await prisma.transaction.count({
        where:{
          userId: req.user?.id,
          status: "Paid"
        }
      })
  
      const upcoming = await prisma.transaction.count({
        where:{
          userId: req.user?.id,
          event: {
            eventDate: {
              lt: new Date()
            }
          }       
        }
      })
      res.status(200).send({
        status: 'ok',
        message: 'transaction found',
        transaction,
        successTrans,
        upcoming
      })
    } catch (error) {
      res.status(400).send({
        status: 'error',
        message: error
      })
    }
    

    

  }

  async createTransactions(req: Request, res: Response) {
    try {
        await prisma.$transaction(async (tx)=>{
          const ticketOrder = await tx.transaction.create({
            data:  {
              ...req.body,
              userId: req.user?.id,
              status: "WaitingPayment"
            }
          })
          if (ticketOrder.pointId) {
            await tx.pointUser.update({
              where: {
                id: ticketOrder.pointId,
              },
              data: {
                isRedeem: true,
                transactionId: ticketOrder.id
              }
            })
          }
          if (ticketOrder.useReferral) {
            await tx.user.update({
              where: {
                id: req.user?.id
              },
              data: {
                isRedeem: true
              }
            })
          }
          const event = await tx.event.findUnique({
            where: {
              id: ticketOrder.eventId
            }
          });
    
          await tx.event.update({
            where: {
              id: ticketOrder.eventId
            },
            data: {
              availableTickets: event?.availableTickets! - ticketOrder.quantity
            }
          })  
          
          const d = new Date()
          const expireAt = new Date(d.setMinutes(d.getMinutes() + 10))
          createEvent({
            name: `INV${ticketOrder.id}`,
            expireAt: formatDateToLocalString(expireAt),
            orderId: ticketOrder.id
          })
          
          res.status(201).send({
              status:'ok',
              message:'Transaction successfully created. Please complete your payment',
              ticketOrder
          });
        })
      } catch (error) {
        console.log(error)
        res.status(400).send({
            status: 'error',
            message: error
        });
      }
    }

  async paymentUpload(req: Request, res: Response) {
    try {
      const {file} = req
      if (!file) throw "no file uploaded"
      const imageUrl = `http://localhost:8000/public/images/${file.filename}`
      await prisma.transaction.update({
        data: {
          imageUrl: imageUrl,
          status: "WaitingConfirmation",
          paidAt: new Date()
        },
        where: {
          id: +req.params.slug
        }
      })
      res.status(200).send({
        status: 'ok',
        message: 'payment recieved, waiting for confirmation'
      })
    } catch (error) {
      res.status(400).send({
        status: 'error',
        message: error
      })
    }
  }

  async paymentConfirmation(req: Request, res: Response) {
    try {
      const transaction = await prisma.transaction.update({
        data: {
          status: "Paid",
          confirmedAt: new Date()
        },
        where:{
          id: +req.params.slug
        }
      })

      if (transaction.pointId) {
        await prisma.pointUser.update({
          data: {
            transactionId: transaction.id
          },
          where: {
            id: transaction.pointId
          }
        })
      }

      res.status(200).send({
        status: 'ok',
        message: 'payment confirmed'
      })
    } catch (error) {
      res.status(400).send({
        status: 'error',
        message: error
      })
    }
  }

  async paymentDecline(req:Request, res: Response) {
    try {
      const transaction = await prisma.transaction.update({
        data: {
          status: "Declined",
          DeclinedAt: new Date()
        },
        where: {
          id: +req.params.slug
        }
      })
      if (transaction.pointId) {
        await prisma.pointUser.update({
          where: {
            id: transaction.pointId
          },
          data: {
            isRedeem: false,
            transactionId: null
          }
        })
      }
      if (transaction.useReferral) {
        await prisma.user.update({
          where: {
            id: transaction.userId
          },
          data: {
            isRedeem: false
          }
        })
      }

      const event = await prisma.event.findUnique({
        where: {
          id: transaction.eventId
        }
      });

      await prisma.event.update({
        where: {
          id: transaction.eventId
        },
        data: {
          availableTickets: event?.availableTickets! + transaction.quantity
        }
      })   

      res.status(200).send({
        status: 'ok',
        message: 'payment declined'
      })
    } catch (error) {
      res.status(400).send({
        status: 'error',
        message: error
      })
      
    }
  }

  async getTransactionDetails(req: Request, res: Response) {
    try {
      let dateStart 
      let dateEnd
      const now = new Date();
      const { filter } = req.query

      if (filter == 'year') {
        dateStart = new Date(now.getFullYear(), 0, 1)
        dateEnd = new Date()
      } else if (filter == 'month') {
          dateStart = new Date(now.getFullYear(), now.getMonth(), 1)
          dateEnd = new Date()
      } else if (filter == 'day') {
          dateStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
          dateEnd = new Date()  
      }

      const transactionDetails = await prisma.transaction.aggregate({
        where: {
            status: "Paid",
            event: {
                slug: req.params.slug
            },
            createdAt: {
              gte: dateStart,
              lte: dateEnd
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

      const transactions = await prisma.transaction.findMany({
        where: {
            status: "Paid",
            event: {
                slug: req.params.slug
            },
            createdAt: {
                gte: dateStart,
                lte: dateEnd
            }
        },
        select: {
            quantity: true,
            grandTotal: true,
            createdAt: true,
            status: true
        }
      });

      console.log('data', transactions);

      const monthNames = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    let groupedTransactions: any = {};
    if (filter === 'year') {
        transactions.forEach(transaction => {
          const month = transaction.createdAt.getMonth();
          const key = `${monthNames[month]}`

          if (!groupedTransactions[key]) {
              groupedTransactions[key] = {
                  category: key, 
                  tickets: 0,
                  revenues: 0,
                  transactions: 0
              };
          }
          groupedTransactions[key].tickets += transaction.quantity;
          groupedTransactions[key].revenues += transaction.grandTotal;
          groupedTransactions[key].transactions += 1;
        });
    } else if (filter === 'month') {
        transactions.forEach(transaction => {
          const date = transaction.createdAt.getDate()
          const key = `${date}`

          
          if (!groupedTransactions[key]) {
            groupedTransactions[key] = {
                category: key, 
                tickets: 0,
                revenues: 0,
                transactions: 0
            };
          }
          groupedTransactions[key].tickets += transaction.quantity;
          groupedTransactions[key].revenues += transaction.grandTotal;
          groupedTransactions[key].transactions += 1;
        })
    } else if (filter === 'day') {
        transactions.forEach(transaction => {
          const hour = transaction.createdAt.getHours()
          const key = `${hour}`

          
          if (!groupedTransactions[key]) {
            groupedTransactions[key] = {
                category: key, 
                tickets: 0,
                revenues: 0,
                transactions: 0
            };
          }
          groupedTransactions[key].tickets += transaction.quantity;
          groupedTransactions[key].revenues += transaction.grandTotal;
          groupedTransactions[key].transactions += 1;
        })
    } 

    const groupedTransactionArray = filter === 'year' || filter === 'month' || filter === 'day'   
    ? Object.values(groupedTransactions) 
    : groupedTransactions;

    res.status(200).send({
        status: 'ok',
        message: 'transaction details found',
        details: groupedTransactionArray,
        summary: {
          ticketSold: transactionDetails._sum.quantity,
          totalRevenue: transactionDetails._sum.grandTotal,
          totalTransaction: transactionDetails._count.status,
        }
    });

    } catch (error) {
      res.status(400).send({
        status: 'error',
        message: error
      })
    }
  }


  
}


