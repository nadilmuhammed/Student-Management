import express from "express"
import { Internlogin, getInternDetails, getInternDetailsID, updateInternLogin } from "../controllers/Intern/intern.js";
import multer from "multer";
import path from "path";
import { createInternAssignment, getAssignIntern, getAssignmentOneID, getInternAssignmentID } from "../controllers/Intern/Assignment.js";

const routerIntern = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/'); // Specify the destination folder for uploaded files
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname)); // Use the current timestamp as a unique filename
    },
  });

  const upload = multer({ storage });


  const storagefile = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'internfiles/'); // Specify the destination folder for uploaded files
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname)); // Use the current timestamp as a unique filename
    },
  });
  
  const storeFiles = multer({ storagefile });
  console.log(storeFiles,"all");
 
// Login
routerIntern.post("/internlogin", Internlogin);
routerIntern.get("/getinternDetails", getInternDetails);
routerIntern.get("/getinternDetailsID/:id", getInternDetailsID);
routerIntern.put("/updateInternprofile/:id",upload.single('image'), updateInternLogin);

// Assignment
routerIntern.post("/createassignment",storeFiles.single('file'), createInternAssignment);
routerIntern.get("/getassignment/:id", getInternAssignmentID);
routerIntern.get("/getassignment", getAssignIntern);
routerIntern.get("/getassignmentall/:id", getAssignmentOneID);




export default routerIntern;