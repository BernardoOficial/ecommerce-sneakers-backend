const routerCustomers = require("express").Router();
const Customers = require("../controller/Customers");
routerCustomers.get("/customer", Customers.getCustomer);
routerCustomers.get("/customers", Customers.getCustomers);
routerCustomers.post("/customers", Customers.postCustomer);
routerCustomers.patch("/customers", Customers.updateCustomer);
routerCustomers.delete("/customers/:id", Customers.deleteCustomer);
module.exports = routerCustomers;