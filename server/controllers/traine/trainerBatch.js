import TrainerBatch from "../../models/traine/trainerBatch.js";


export const createBatchTrainer = async(req,res)=>{
    
    const { name,interns  } = req.body;

    if (!name) {
      return res.status(400).json({ message: "name is required" });
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


  export const getTrainerBatch = async(req,res)=>{
    try {
        let response = await TrainerBatch.find();
        res.json({message: response, status:true});
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