import { Router } from "express";
import { Payment } from "../controller/Payment";
const routerPayments = Router();
routerPayments.get("/payments", Payment.getPayment);
routerPayments.post("/payments", Payment.postPayment);
export { routerPayments };