require('dotenv').config()
const cors = require("cors");

const express = require("express");
const app = express();

app.use(cors());
app.use(express.json());

const routerProducts = require("./routers/Products");
const routerCustomers = require("./routers/Customers");
const routerOrders = require("./routers/Orders");
const routerPayment = require("./routers/Payment");

app.use(routerProducts);
app.use(routerCustomers);
app.use(routerOrders);
app.use(routerPayment);

app.listen(process.env.PORT || 4000, function() { console.log("backend started! 🚀") });