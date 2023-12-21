import Intern from "../../models/admIntern.js";
import TrainerBatch from "../../models/traine/trainerBatch.js";


export const createBatchTrainer = async(req,res)=>{
    
    const { name,interns  } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Batch name required" });
    }

    if (!interns) {
      return res.status(400).json({ message: "interns required" });
    }

    let product = await TrainerBatch({name,interns});

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
    console.log(id);

    const { name,interns  } = req.body;
    if (!name) {
      return res.status(400).json({ message: "Batch name required" });
    }

    if (!interns) {
      return res.status(400).json({ message: "interns required" });
    }

    try {
      let updateUser = await TrainerBatch.findByIdAndUpdate(id,{$set:{name,interns}});
      res.status(202).json({message: updateUser, status:true});
    } catch (error) {
      console.log({message: error.message, status:false});
    }
  }



  export const deleteTrainerBatch = async(req,res)=>{
    let { id } = req.params;
    try {
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

        let getIntern = response.map(async(intern) =>{
          const {...other} = intern;
          const internall = await Intern.find({ _id: { $in: intern.interns } });
          const {...internOther} = internall;
          const data = await Intern.find({_id: { $in: intern.interns } });
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


  export const getTrainerBatchID = async(req,res) =>{
    const {id} =req.params;
    try {
        let response = await TrainerBatch.findById(id);
        res.json({message: response, status:true});
    } catch (error) {
        console.log({message: error.message, status:false});
    }
  }  