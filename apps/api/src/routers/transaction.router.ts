import { createTransacion, getTransaction } from "@/controllers/transaction.controllers";
import { Router } from "express";

const transactionRouter = Router()

transactionRouter.post('/', createTransacion)
transactionRouter.get('/', getTransaction)

export { transactionRouter }