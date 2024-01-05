import { unlink } from "fs";
import BatcheForAdmin from "../models/adminBatch.js";
import Intern from "../models/admIntern.js";
import Trainer from "../models/Admintraine.js";
import UUser from "../models/Admintraine.js";
import TrainerBatch from "../models/traine/trainerBatch.js";
import Assignment from "../models/traine/assignment.js";

 export const createIntern = async(req,res)=>{
    const { name,email,password,trainerReference,batch,Assignedby,batchnumber } = req.body;
    if(!name) {
      return res.status(400).json({message:"Name is required"})
    }
    if(!email) {
      return res.status(400).json({message:"Email is required"})
    }  
    if(!password) {
      return res.status(400).json({message:"Email is required"})
    }
    if(!req.file){
      return res.status(400).json({message: " Upload an image"})
    }
    if(!trainerReference) {
        return res.status(400).json({message:"Traine is required"})
      }
    if(!batch) {
      return res.status(400).json({message:"Batch is required"})
    }

    const ImagePath = req.file.filename

    let product = await Intern({name,email,password,trainerReference,image:ImagePath,batch,Assignedby,batchnumber})

  try {
    const result = await product.save();
    res.json({ result: result, status: true });
  } catch (error) {
    res.json({ message: error.message, status: false });
  }
}


export const updateintern= async(req,res)=>{
    const {id} = req.params;
    console.log(id)
    const {name,password, email,trainerReference, batch,Assignedby} = req.body;
    if(!name) {
      return res.status(400).json({message:"Name is required"})
    }
    if(!email) {
      return res.status(400).json({message:"Email is required"})
    }
    if(!password) {
      return res.status(400).json({message:"Email is required"})
    }else if(password.length < 8 || password.length > 16){
      return res.status(400).json({message : "Password must be between 8 and 16 characters"})
    }
    if(!req.file){
      return res.ststus(400).json({message: " Upload an image"})
    }
    if(!trainerReference) {
        return res.status(400).json({message:"Traine is required"})
      }
    if(!batch) {
      return res.status(400).json({message:"Batch is required"})
    }

    const ImagePath = req.file.filename

    try {
        const updatedUser = await Intern.findByIdAndUpdate(id,{$set:{name, email,password,image:ImagePath,trainerReference,batch,Assignedby}},{new:true});
        res.status(201).json(updatedUser);
    } catch (error) {
      console.log('errr',error);
        res.json(error.message);
    }
  }


export const deleteintern = async(req,res)=>{
    const { id } = req.params;
    try {

      const imageid = await Intern.findById(id);

      const DuplicateTrainerIntern = await Assignment({interns:id})

      if(DuplicateTrainerIntern.length > 0){
        return res.status(404).json({message : "Interns exist in assignment"})
      }

      
      const result = await Intern.findByIdAndDelete(id);
      
      if(!result){
        return res.status(404).json({error: "Image not found"});
      }
      
      unlink(`uploads/${imageid.image}`, function (err) {
        if (err) {
            console.error('Error deleting file:', err);
        } else {
            console.log('File is deleted!');
        }
    });

    const trainerid = await UUser.findById(id); 
      console.log(trainerid.name,"trainerid");

  
      res.status(200).json(result)
    } catch (error) {
      res.json({ message: error.message, status: false });
    }
  }


export const getIntern = async(req,res)=>{
    try {
      const result = await Intern.find(); 

      // console.log(result,'result')

     let getIntern =  result.map(async(inter)=>{
        const { ...other } = inter;
      const trainer = await Trainer.findById(inter.trainerReference); 
      const { ...trainerOther } = trainer
      const batch = await BatcheForAdmin.findById(inter.batch); 
      const { ...batchOther } = batch
      const batchnumber = Intern.findById(inter.batchnumber);
      const { ...batchnoOther } = batchnumber;

      return {...other._doc,trainerData:trainerOther._doc,batchData:batchOther._doc,batchNumber:batchnoOther._doc}

      })

      const getTrainers = await Promise.all(getIntern)

      res.status(200).json(getTrainers);
    } catch (error) {
      res.json(error.message);
    }
  } 



  export const getInternID = async(req,res)=>{
    const {id} = req.params;
    try {
      const result = await Intern.findById(id);

      console.log(result,"huhu");
      res.json(result );
      // return true
    } catch (error) {
      res.json({ message: error.message, status: false });
    }
  }