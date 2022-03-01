const routerToken = require("express").Router();
const Token = require("../controller/Token");
routerToken.get("/token", Token.getToken);
routerToken.post("/token", Token.postToken);
routerToken.patch("/token", Token.updateToken);
module.exports = routerToken;