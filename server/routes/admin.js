import express from "express";
import { getadmin, login, register, updateadmin } from "../controllers/admin.js";
import { createtraine, deletetraine, getByID, getTraineBatch, getraine, updatetraine } from "../controllers/admintraine.js";
import { createIntern, deleteintern, getIntern, getInternID, updateintern } from "../controllers/adminIntern.js";
import { createBatch, deletebatch, getBatch, getBatchID, updatebatch } from "../controllers/adminBatch.js";
import multer from "multer";
import path from "path";

const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/'); // Specify the destination folder for uploaded files
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname)); // Use the current timestamp as a unique filename
    },
  });

  
  
  const upload = multer({ storage:storage });

// admin login register
router.post("/register", register);
router.post("/login", login);

router.put("/updateadmin/:id", updateadmin)
router.get("/getadmin", getadmin)

// admintraine
router.post("/createtraine",upload.single('image'), createtraine)
router.put("/updatetraine/:id",upload.single('image'), updatetraine)
router.delete("/deletetraine/:id",upload.single('image'), deletetraine)
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
