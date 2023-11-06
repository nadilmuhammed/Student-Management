import express from "express";
import { login, register } from "../controllers/admin.js";
import { createtraine, deletetraine, getByID, getraine, updatetraine } from "../controllers/admintraine.js";

const router = express.Router();

// admin login register
router.post("/register", register);
router.post("/login", login);
router.delete("/deletetraine")

// admintraine
router.post("/createtraine", createtraine)
router.put("/updatetraine/:id", updatetraine)
router.delete("/deletetraine/:id", deletetraine)
router.get("/admintraineID/:id", getByID)
router.get("/admintraine", getraine)

export default router;
