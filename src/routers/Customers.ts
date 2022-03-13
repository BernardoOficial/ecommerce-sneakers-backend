import { Router } from "express";
import { Customers } from "../controller/Customers";
const routerCustomers = Router();
routerCustomers.get("/customer", Customers.getCustomer);
routerCustomers.get("/customers", Customers.getCustomers);
routerCustomers.post("/customers", Customers.postCustomer);
routerCustomers.patch("/customers", Customers.updateCustomer);
routerCustomers.delete("/customers/:id", Customers.deleteCustomer);
export { routerCustomers };