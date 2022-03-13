import { Router } from "express";
import { Orders } from "../controller/Orders";
const routerOrders = Router();
routerOrders.get("/orders", Orders.getOrders);
routerOrders.post("/orders", Orders.postOrder);
routerOrders.patch("/orders", Orders.updateOrder);
routerOrders.delete("/orders/:id", Orders.deleteOrder);
export { routerOrders }