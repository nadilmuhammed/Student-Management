import Intern from "../../models/admIntern.js";
import Assignment from "../../models/traine/assignment.js";
import TrainerBatch from "../../models/traine/trainerBatch.js";


export const createBatchTrainer = async(req,res)=>{
    
    const { name,interns,Assignedby  } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Batch name required" });
    }

    if (!interns) {
      return res.status(400).json({ message: "interns required" });
    }

    let product = await TrainerBatch({name,interns,Assignedby});

    try { 
      let response = await product.save();
      res.json({response : response , status :true});
    } catch (error) {
      console.log({message: error.message, status:false});
      res.json({response : error.message , status :false});

    }

  }


  export const updateTrainerBatch = async(req,res) => {
    const {id} = req.params;

    const { name,interns,Assignedby  } = req.body;
    if (!name) {
      return res.status(400).json({ message: "Batch name required" });
    }

    if (!interns) {
      return res.status(400).json({ message: "interns required" });
    }

    try {
      let updateUser = await TrainerBatch.findByIdAndUpdate(id,{$set:{name,interns,Assignedby}});
      res.status(202).json({message: updateUser, status:true});
    } catch (error) {
      console.log({message: error.message, status:false});
    }
  }



  export const deleteTrainerBatch = async(req,res)=>{
    let { id } = req.params;
    try {

      const DuplicateBatch = await Assignment.find({batch:id})

      if(DuplicateBatch.length > 0) {
        return res.status(402).json({message: "Batch exist in assignment"})
      }


     let response = await TrainerBatch.findByIdAndDelete(id);
     res.json({message:response , status:true})
     console.log("deleted");
    } catch (error) {
      console.log({message:error.message, status:false});
    }
  }


  export const getTrainerBatch = async(req,res)=>{
    try {
        let response = await TrainerBatch.find();

        res.status(200).json(response)
    } catch (error) {
        console.log({message: error.message, status:false});
    }
  }


  export const getTrainerBatchID = async(req,res) =>{
    const {id} =req.params;
    try {
        let response = await TrainerBatch.find({Assignedby:id});

        let getIntern = response.map(async(intern) =>{
          const {...other} = intern;
          const internall = await Intern.find({ _id: { $in: intern.interns } });
          const {...internOther} = internall;
          const data = await Intern.find({_id: { $in: intern.interns} });
          const {...dataOther} = data;
          
          return { ...other._doc,internData:internall,studentsData:data };
        })
        
        const getintern = await Promise.all(getIntern);
        console.log(getIntern,'alll');
        res.status(200).json(getintern);
    } catch (error) {
        console.log({message: error.message, status:false});
    }
  }  