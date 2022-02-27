const routerOrders = require("express").Router();
const Orders = require("../controller/Orders");
routerOrders.get("/orders", Orders.getOrders);
routerOrders.post("/orders", Orders.postOrder);
routerOrders.patch("/orders", Orders.updateOrder);
routerOrders.delete("/orders/:id", Orders.deleteOrder);
module.exports = routerOrders;