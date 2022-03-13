import { Router } from "express";
import { Products } from "../controller/Products";
const routerProducts = Router();
routerProducts.get("/products", Products.getProducts);
routerProducts.post("/products", Products.postProduct);
routerProducts.patch("/products", Products.updateProduct);
routerProducts.delete("/products/:id", Products.deleteProduct);
export { routerProducts }