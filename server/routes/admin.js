import express from "express";
import { login, register } from "../controllers/admin.js";
import { createtraine, deletetraine, getByID, getraine, updatetraine } from "../controllers/admintraine.js";
import { createIntern, deleteintern, getIntern, getInternID, updateintern } from "../controllers/adminIntern.js";

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


//adminIntern
router.post("/createintern", createIntern);
router.put("/updateintern/:id", updateintern);
router.delete("/deleteintern/:id", deleteintern)
router.get("/adminintern", getIntern)
router.get("/adminintern/:id", getInternID)

export default router;
