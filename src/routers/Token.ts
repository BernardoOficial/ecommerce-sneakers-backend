import { Router } from "express";
import { Token } from "../controller/Token";
const routerToken = Router();
routerToken.get("/token", Token.getToken);
routerToken.post("/token", Token.postToken);
routerToken.patch("/token", Token.updateToken);
export { routerToken }