import express from "express"
import { Internlogin, getInternDetails, getInternDetailsID, updateInternLogin } from "../controllers/Intern/intern.js";
import multer from "multer";
import path from "path";



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/'); // Specify the destination folder for uploaded files
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname)); // Use the current timestamp as a unique filename
    },
  });
  
  const upload = multer({ storage });


const routerIntern = express.Router();


routerIntern.post("/internlogin", Internlogin);
routerIntern.get("/getinternDetails", getInternDetails);
routerIntern.get("/getinternDetailsID/:id", getInternDetailsID);
routerIntern.put("/updateInternprofile/:id",upload.single('image'), updateInternLogin);



export default routerIntern;