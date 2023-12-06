import express from "express"
import { getData, login, updatetraine, deletetraine } from "../controllers/traine/traine.js";

const routerTraine = express.Router();

// traine reg-log
routerTraine.post("/login", login);
routerTraine.get("/trainedata", getData);
routerTraine.put("/updatetraine/:id", updatetraine);
routerTraine.delete("/deletetraine/:id", deletetraine)


export default routerTraine; 