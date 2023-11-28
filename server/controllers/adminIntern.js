import BatcheForAdmin from "../models/adminBatch.js";
import Intern from "../models/admIntern.js";
import Trainer from "../models/Admintraine.js";

 export const createIntern = async(req,res)=>{
    const { name,email,trainerReference,batch } = req.body;
    console.log(req.body);
    if(!name) {
      return res.status(400).json({message:"Name is required"})
    }
    if(!email) {
      return res.status(400).json({message:"Email is required"})
    }
    if(!trainerReference) {
        return res.status(400).json({message:"Traine is required"})
      }
    if(!batch) {
      return res.status(400).json({message:"Batch is required"})
    }
    let product = await Intern({name,email,trainerReference,batch})
    console.log(req.body, "req.body");

  try {
    const result = await product.save();
    console.log(result);
    res.json({ result: result, status: true });
  } catch (error) {
    res.json({ message: error.message, status: false });
  }
}


export const updateintern= async(req,res)=>{
    const {id} = req.params;
    console.log(id)
    const {name, email,trainerReference, batch} = req.body;
  
    try {
        const updatedUser = await Intern.findByIdAndUpdate(id,{$set:{name, email,trainerReference,batch}},{new:true});
        res.status(201).json(updatedUser);
    } catch (error) {
      console.log('errr',error);
        res.json(error.message);
    }
  }


export const deleteintern = async(req,res)=>{
    console.log("delte", req.params);
    const { id } = req.params;
    try {
  
      const result = await Intern.findByIdAndDelete(id);
      res.status(200).json(result)
    } catch (error) {
      res.json({ message: error.message, status: false });
    }
  }


export const getIntern = async(req,res)=>{
    try {
      const result = await Intern.find(); 


     let getIntern =  result.map(async(inter)=>{
        const { ...other } = inter;
      const trainer = await Trainer.findById(inter.trainerReference); 
      const { ...trainerOther } = trainer
      const batch = await BatcheForAdmin.findById(inter.batch); 
      const { ...batchOther } = batch

      console.log(batch,'batch');

      return {...other._doc,trainerData:trainerOther._doc,batchData:batchOther._doc}

      })

      const getTrainers = await Promise.all(getIntern)
      console.log(getTrainers,'ffff');

      res.status(200).json(getTrainers);
    } catch (error) {
      res.json(error.message);
    }
  } 



  export const getInternID = async(req,res)=>{
    const {id} = req.params;
    try {
      const result = await Intern.findById(id)
      res.json(result );
      return true
    } catch (error) {
      res.json({ message: error.message, status: false });
    }
  }