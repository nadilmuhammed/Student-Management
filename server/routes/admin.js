import express from "express";
import { getadmin, login, register, updateadmin } from "../controllers/admin.js";
import { createtraine, deletetraine, getByID, getTraineBatch, getraine, updatetraine } from "../controllers/admintraine.js";
import { createIntern, deleteintern, getIntern, getInternID, updateintern } from "../controllers/adminIntern.js";
import { createBatch, deletebatch, getBatch, getBatchID, updatebatch } from "../controllers/adminBatch.js";

const router = express.Router();

// admin login register
router.post("/register", register);
router.post("/login", login);

router.put("/updateadmin/:id", updateadmin)
router.get("/getadmin", getadmin)

// admintraine
router.post("/createtraine", createtraine)
router.put("/updatetraine/:id", updatetraine)
router.delete("/deletetraine/:id", deletetraine)
router.get("/admintraineID/:id", getByID)
router.get("/getTrainebatch/:id" , getTraineBatch)
router.get("/admintraine", getraine)


//adminIntern
router.post("/createintern", createIntern);
router.put("/updateintern/:id", updateintern);
router.delete("/deleteintern/:id", deleteintern)
router.get("/adminintern", getIntern)
router.get("/adminintern/:id", getInternID)


// adminBatch
router.post("/createBatch" , createBatch)
router.put("/updatebatch/:id", updatebatch)
router.delete("/deletebatch/:id", deletebatch)
router.get("/getbatch", getBatch)
router.get("/getbatchID/:id", getBatchID)

export default router;
