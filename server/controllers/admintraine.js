
import { unlink } from "fs";
import UUser from "../models/Admintraine.js";
import Batch from "../models/adminBatch.js";


export const createtraine = async(req,res)=>{

    const { name,email,username,password,id_no } = req.body;
// return true;
    console.log(req.body,"create trainer api");
    if(!name) {
      return res.status(400).json({message:"Name is required"})
    }
    if(!email) {
      return res.status(400).json({message:"Email is required"})
    }
    if(!username) {
      return res.status(400).json({message:"Username is required"})
    }
    if (!password) {
      return res.status(400).json({ message: "Password is required" });
    } else if (password.length < 8 || password.length > 16) {
      return res.status(400).json({ message: "Password must be between 8 and 16 characters" });
    }
    if(!req.file) {
      return res.status(400).json({message:"Upload an image"})
    }
    if(!id_no) {
      return res.status(400).json({message:"id_no is required"})
    }else if(id_no.length < 4 || id_no.length > 8){
      return res.status(400).json({message:"Id no should be atleast 4 digits long"});
    }

    const imagePath = req.file.filename
    console.log(imagePath,"imagepath");

    let product = await UUser({name,email,username,password,image:imagePath,id_no})
    console.log(req.body, "req.body");

  try {
    const result = await product.save();
    res.json({ result: result, status: true });
  } catch (error) {
    res.json({ message: error.message, status: false });
  }
}


export const updatetraine= async(req,res)=>{
  const {id} = req.params;
  console.log(id)
  const {name, email,username,password,id_no } = req.body;
  if(!name) {
    return res.status(400).json({message:"Name is required"})
  }
  if(!email) {
    return res.status(400).json({message:"Email is required"})
  }
  if(!username) {
    return res.status(400).json({message:"Username is required"})
  }
  if (!password) {
    return res.status(400).json({ message: "Password is required" });
  } else if (password.length < 8 || password.length > 16) {
    return res.status(400).json({ message: "Password must be between 8 and 16 characters" });
  }
  if(!req.file) {
    return res.status(400).json({message:"Upload an image"})
  }
  if(!id_no) {
    return res.status(400).json({message:"id_no is required"})
  }else if(id_no.length < 4 || id_no.length > 8){
    return res.status(400).json({message:"Id no should be atleast 4 digits long"});
  }

  const imagePath = req.file.filename;

  try {
      const updatedUser = await UUser.findByIdAndUpdate(id,{$set:{name, email,username,password,image:imagePath,id_no  }},{new:true});
      res.status(201).json(updatedUser);
  } catch (error) {
    console.log('errr',error);
      res.json(error.message);
  }
}

export const deletetraine = async(req,res)=>{
  const { id } = req.params; 
  try {
    const imageid = await UUser.findById(id);
    
    const result = await UUser.findByIdAndDelete(id);

    if (!result){
      return res.status(404).json({error: "Image not found"});
    }

    unlink(  `uploads/${imageid.image}`, function (err) {
      if (err) {
          console.error('Error deleting file:', err);
      } else {
          console.log('File is deleted!');
      }
  });
    res.status(200).json(result)
  } catch (error) {
    res.json({ message: error.message, status: false });
  }
}


export const getByID = async(req,res)=>{
  const {id} = req.params;
  try {
    const result = await UUser.findById(id)
    res.json(result );
    return true
  } catch (error) {
    res.json({ message: error.message, status: false });
  }
}


export const getTraineBatch = async(req,res)=>{
  const {id} = req.params;
  console.log(id);
  try {
    const result = await Batch.find({trainerReference:id});
    res.json(result);
    console.log(result);
  } catch (error) {
    res.json({message : error.message})
  }
}




export const getraine = async(req,res)=>{
  try {
    const result = await UUser.find(); 
    console.log(result);
    res.status(200).json(result);
  } catch (error) {
    res.json(error.message);
  }
} 














