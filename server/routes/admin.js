import express from "express";
import { getadmin, login, register, updateadmin } from "../controllers/admin.js";
import { createtraine, deletetraine, getByID, getTraineBatch, getraine, updatetraine } from "../controllers/admintraine.js";
import { createIntern, deleteintern, getIntern, getInternID, updateintern } from "../controllers/adminIntern.js";
import { createBatch, deletebatch, getBatch, getBatchID, updatebatch } from "../controllers/adminBatch.js";
import multer from "multer";
import path from "path";
import jwt from "jsonwebtoken";

const router = express.Router();


const adminAuth = (req, res, next) => {
    const authorizationHeader = req.headers.authorization;
    
    if (!authorizationHeader) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    
    const responseForSplit= authorizationHeader.split(' ');

    if (responseForSplit.length !== 2) {
      return res.status(401).json({ message: 'Invalid authorization header format' });
    }
    
  jwt.verify(responseForSplit[1], 'your-secret-key', (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }
    // req.user = user;
    // console.log(user)
    next();
  });
};

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/'); // Specify the destination folder for uploaded files
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname)); // Use the current timestamp as a unique filename
    },
  });
  
  const upload = multer({ storage });

// admin login register
router.post("/register", register);
router.post("/login", login);

router.put("/updateadmin/:id", updateadmin)
router.get("/getadmin", getadmin)

// admintraine
router.post("/createtraine",upload.single('image'), createtraine)
router.put("/updatetraine/:id",upload.single('image'), updatetraine)
router.delete("/deletetraine/:id", deletetraine)
router.get("/admintraineID/:id", getByID)
router.get("/getTrainebatch/:id" , getTraineBatch)
router.get("/admintraine", getraine)


//adminIntern
router.post("/createintern",upload.single('image'), createIntern);
router.put("/updateintern/:id",upload.single('image'), updateintern);
router.delete("/deleteintern/:id",adminAuth, deleteintern)
router.get("/adminintern", getIntern)
router.get("/adminintern/:id", getInternID)


// adminBatch
router.post("/createBatch" , createBatch)
router.put("/updatebatch/:id", updatebatch)
router.delete("/deletebatch/:id", deletebatch)
router.get("/getbatch", getBatch)
router.get("/getbatchID/:id", getBatchID)

export default router;
