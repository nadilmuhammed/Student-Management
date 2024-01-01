import AssignmentIntern from "../../models/Intern/Assignment.js";
import Intern from "../../models/admIntern.js";
import Assignment from "../../models/traine/assignment.js";


export const createInternAssignment = async(req,res)=>{
    
    const { topic,question,work,duedate  } = req.body;

    if (!topic) {
      return res.status(400).json({ message: "name is required" });
    }
    if (!question) {
      return res.status(400).json({ message: "Enter your question" });
    }
    if (!duedate) {
      return res.status(400).json({ message: "Batch required" });
    }
    if (!work) {
      return res.status(400).json({ message: "Interns required" });
    }

    let product = await AssignmentIntern({topic,question,work,duedate});

    try {
      let response = await product.save();
      res.status(200).json(response);
    } catch (error) {
      console.log({message: error.message, status:false});
      res.json({message : error.message , status :false});

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


