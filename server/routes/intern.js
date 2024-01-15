import express from "express"
import { Internlogin, getInternDetails, getInternDetailsID, updateInternLogin } from "../controllers/Intern/intern.js";
import multer from "multer";
import path from "path";
import { createInternAssignment, getAssignIntern, getAssignmentOneID, getInternAssignmentID, likeAssign } from "../controllers/Intern/Assignment.js";
import { getallIdnotes } from "../controllers/Intern/notes.js";

const routerIntern = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      console.log(file,'destination');
      cb(null, 'uploads/'); // Specify the destination folder for uploaded files
    },
    filename: function (req, file, cb) {

      cb(null, Date.now() + path.extname(file.originalname)); // Use the current timestamp as a unique filename
    },
  });

  const upload = multer({ storage });


  const storagefile = multer.diskStorage({
    destination: function (req, file, cb) {
      console.log(file,'file');
      cb(null, 'internfiles/'); // Specify the destination folder for uploaded files
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname)); // Use the current timestamp as a unique filename
    },
  });
  
  const storeFiles = multer({ storage:storagefile });

  // console.log(storagefile.getFilename(),'storagefile');
 
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
routerIntern.post("/like/:id", likeAssign);

// notes
routerIntern.get("/getallNotes/:id", getallIdnotes);





export default routerIntern;