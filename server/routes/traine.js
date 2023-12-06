import express from "express"
import { getData, login, updatetraine, deletetraine } from "../controllers/traine/traine.js";
import { createtrainerIntern } from "../controllers/traine/intern.js";
import multer from "multer";
import path from "path";

const routerTraine = express.Router();


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'traineruploads/'); // Specify the destination folder for uploaded files
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname)); // Use the current timestamp as a unique filename
    },
  });
  
  const upload = multer({ storage });

// traine reg-log
routerTraine.post("/login", login);
routerTraine.get("/trainedata", getData);
routerTraine.put("/updatetraine/:id", updatetraine);
routerTraine.delete("/deletetraine/:id", deletetraine)

// intern
routerTraine.post("/trainerintern", upload.single('image'), createtrainerIntern);



export default routerTraine; 