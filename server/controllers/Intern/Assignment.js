import AssignmentIntern from "../../models/Intern/Assignment.js";
import Intern from "../../models/admIntern.js";
import Assignment from "../../models/traine/assignment.js";


export const createInternAssignment = async(req,res)=>{
    
    const { topic,question,duedate,Assignedby,assignmentid  } = req.body;
    
    if (!req.file) {
      return res.status(400).json({ message: "uplaod your work" });
    }

    const filePath = req.file.filename

    let product = await AssignmentIntern({topic,question,file:filePath,duedate,Assignedby,assignmentid});

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
        
    let r = await Promise.all(    response.map(async(items) => {
          const {...other } = items
          const assignment = await AssignmentIntern.findOne({assignmentid:items._id,Assignedby:id})

          if(assignment){
            const {...otherdata} = assignment;
            return {answer:otherdata._doc,...other._doc}
          }else{
            return {...items._doc}
          }
          // console.log(assignment,"assign");
     


        }))
        console.log(r);
        res.status(200).json(r);
    } catch (error) {
        console.log(error.message);
    }
  }


  export const likeAssign = async(req,res) => {
    const { id } = req.body
    try {
      const response = await AssignmentIntern.findById(id)
      console.log(response,"assign");

      if(!response){
        return res.status(400).json({message: 'No assignment found'})
      }

      // const existingLike = response.likes.fin
      
    } catch (error) {
      console.log({message: error.message});
    }

  }


