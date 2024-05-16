import { Response, Request } from "express";
import prisma from "@/prisma";

export class TransactionController {
  async getTransaction(req: Request, res: Response) {
    try {
        const events = await prisma.event.findMany()
        res.status(200).send({
            status:'ok',
            events
        })
    } catch (err) {
      console.log(err);
      
        res.status(400).send({
            status: 'error',
            message: err
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

    const groupedTransactionArray = filter === 'year' || filter === 'month' || filter === 'day'   ? Object.values(groupedTransactions) : groupedTransactions;

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


