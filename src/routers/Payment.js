const routerOrders = require("express").Router();
const Orders = require("../controller/Payment");
routerOrders.get("/payment", Orders.getPayment);
routerOrders.post("/payment", Orders.postPayment);
module.exports = routerOrders;