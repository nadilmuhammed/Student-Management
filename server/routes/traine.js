import express from "express"
import { login, updatetraine, deletetraine, getTrainer, getTrainerByID } from "../controllers/traine/traine.js";
import { Trainerupdateintern, getInternofTrainer} from "../controllers/traine/intern.js";
import multer from "multer";
import path from "path";
import { createAssignment, deleteassignment, getAssignID, getAssignOneID, getAssignment, getTrainerIntern, trainerBatchName, updateassignment } from "../controllers/traine/assignment.js";
import { createBatchTrainer, deleteTrainerBatch, getTrainerBatch, getTrainerBatchID, updateTrainerBatch } from "../controllers/traine/trainerBatch.js";
import { createTrainerNotes, deleteNotes, getNotes, getTrainernotedID, getallIdnotes, updateNotes } from "../controllers/traine/notes.js";

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

  const storenotes = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'trainernotes/'); // Specify the destination folder for uploaded files
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname)); // Use the current timestamp as a unique filename
    },
  });

  const storenote = multer({ storage:storenotes });


// traine reg-log
routerTraine.post("/login", login);
routerTraine.get("/trainerdata", getTrainer);
routerTraine.get("/trainerdata/:id", getTrainerByID);
routerTraine.put("/updatetraine/:id",upload.single('image'), updatetraine);
routerTraine.delete("/deletetraine/:id", deletetraine)

// intern
routerTraine.put("/trainerupdateintern/:id", upload.single('image'), Trainerupdateintern);
routerTraine.get("/allinterns/:id", getTrainerIntern);
routerTraine.get("/getinternoftrainer/:id", getInternofTrainer);


// Assignment
routerTraine.post("/createassignment", createAssignment);
routerTraine.get("/getassignment", getAssignment);
routerTraine.get("/getassignmentOne/:id", getAssignOneID);
routerTraine.get("/getassignmentid/:id", getAssignID);
routerTraine.put("/updateassignment/:id", updateassignment);
routerTraine.delete("/deleteassignment/:id", deleteassignment);
routerTraine.get("/getbatchid/:id", trainerBatchName);

// batch
routerTraine.post("/createBatchtrainer", createBatchTrainer);
routerTraine.delete("/deletetrainerbatch/:id", deleteTrainerBatch);
routerTraine.get("/getbatchtrainer", getTrainerBatch);
routerTraine.get("/getbatchtrainerID/:id", getTrainerBatchID);
routerTraine.put("/updatetrainerbatch/:id", updateTrainerBatch);

// notes
routerTraine.post("/createnotes",storenote.single('file'), createTrainerNotes);
routerTraine.get("/getnotes", getNotes);
routerTraine.get("/getallnotesID/:id", getallIdnotes);
routerTraine.get("/getnotesofID/:id", getTrainernotedID);
routerTraine.delete("/deletenotes/:id", deleteNotes);
routerTraine.put("/updatenotes/:id",storenote.single('file'), updateNotes);




export default routerTraine; 