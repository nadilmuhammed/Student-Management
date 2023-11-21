import Batch from "../models/adminBatch.js";


export const createBatch = async(req,res)=>{
    const { batch,trainerReference } = req.body;
    console.log(req.body);
    if(!batch) {
      return res.status(400).json({message:"Batch is required"})
    }
    if(!trainerReference) {
      return res.status(400).json({message:"Select a traine"})
    }
    let product = await Batch({batch,trainerReference})
    console.log(req.body, "req.body");

  try {
    const result = await product.save();
    console.log(result);
    res.json({ result: result, status: true });
  } catch (error) {
    res.json({ message: error.message, status: false });
  }
}


export const updatebatch= async(req,res)=>{
    const {id} = req.params;
    const {batch,trainerReference} = req.body;
    if(!batch) {
      return res.status(400).json({message:"Batch is required"})
    }
    if(!trainerReference) {
      return res.status(400).json({message:"Select a traine"})
    }
  
    try {
        const updatedUser = await Batch.findByIdAndUpdate(id,{$set:{batch,trainerReference}},{new:true});
        res.status(201).json(updatedUser);
    } catch (error) {
      console.log('errr',error);
        res.json(error.message);
    }
  }


  export const deletebatch = async(req,res)=>{
    console.log("delte", req.params);
    const { id } = req.params;
    try {
  
      const result = await Batch.findByIdAndDelete(id);
      res.status(200).json(result)
    } catch (error) {
      res.json({ message: error.message, status: false });
    }
  }


export const getBatch = async(req,res)=>{
    try {
      const result = await Batch.find(); 
      console.log(result);
      res.status(200).json(result);
    } catch (error) {
      res.json(error.message);
    }
  } 


  export const getBatchID = async(req,res)=>{
    const {id} = req.params;
    try {
      const result = await Batch.findById([id])
      res.json(result );
      return true
    } catch (error) {
      res.json({ message: error.message, status: false });
    }
  }