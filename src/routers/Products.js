const routerProducts = require("express").Router();
const Products = require("../controller/Products");
routerProducts.get("/products", Products.getProducts);
routerProducts.post("/products", Products.postProduct);
routerProducts.patch("/products", Products.updateProduct);
routerProducts.delete("/products/:id", Products.deleteProduct);
module.exports = routerProducts;