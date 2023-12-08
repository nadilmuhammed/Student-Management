import express from "express"
import { getData, login, updatetraine, deletetraine } from "../controllers/traine/traine.js";
import { Trainerupdateintern, getInternofTrainer} from "../controllers/traine/intern.js";
import multer from "multer";
import path from "path";
import { createAssignment, deleteassignment, getAssignment, getTrainerIntern, updateassignment } from "../controllers/traine/assignment.js";

const routerTraine = express.Router();


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/'); // Specify the destination folder for uploaded files
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
routerTraine.put("/trainerupdateintern", upload.single('image'), Trainerupdateintern);
routerTraine.get("/allinterns/:id", getTrainerIntern);
routerTraine.get("/getinternoftrainer/:id", getInternofTrainer);


// Assignment
routerTraine.post("/createassignment", createAssignment);
routerTraine.get("/getassignment", getAssignment);
routerTraine.put("/updateassignment/:id", updateassignment);
routerTraine.delete("/deleteassignment/:id", deleteassignment);




export default routerTraine; 