import AssignmentIntern from "../../models/Intern/Assignment.js";
import Intern from "../../models/admIntern.js";
import Assignment from "../../models/traine/assignment.js";


export const createInternAssignment = async(req,res)=>{
    
    const { topic,question,duedate  } = req.body;
    
    if (!req.file) {
      return res.status(400).json({ message: "uplaod your work" });
    }

    const filePath = req.file.filename
    console.log(filePath,"file");

    let product = await AssignmentIntern({topic,question,file:filePath,duedate});

    try {
      let response = await product.save();
      res.status(200).json(response);
    } catch (error) {
      res.status(401).json({message : error.message , status :false});

    }

  }

  export const getAssignIntern = async(req,res)=>{
    try {
      let response = await Assignment.find()
      res.status(200).json(response);
    } catch (error) {
      console.log(error.message);
    }
  }

  export const getAssignmentOneID = async(req,res)=>{
    const { id } = req.params
  
    try {
        let response = await Assignment.findById(id);
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
  }

  export const getInternAssignmentID = async(req,res)=>{
    const { id } = req.params
    try {
        let response = await Assignment.find({interns:id});
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
  }


