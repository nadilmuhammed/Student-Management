// import UUser from "../../models/Admintraine.js";
import Intern from "../../models/admIntern.js";
import TrainerIntern from "../../models/traine/intern.js";



export const Trainerupdateintern= async(req,res)=>{
  const {id} = req.params;
  const {name, email,trainerReference, batch} = req.body;
  if(!name) {
    return res.status(400).json({message:"Name is required"})
  }
  if(!email) {
    return res.status(400).json({message:"Email is required"})
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
      const updatedUser = await TrainerIntern.findByIdAndUpdate(id,{$set:{name, email,image:ImagePath,trainerReference,batch}},{new:true});
      res.status(201).json(updatedUser);
  } catch (error) {
    console.log('errr',error);
      res.json(error.message);
  }
}

export const getInternofTrainer = async (req,res) => {
  const { id }  =req.params;
  console.log(id);
  try {
    let response = await Intern.find({trainerReference:id});
    res.status(200).json(response); 
    console.log(response,"response");
  } catch (error) {
    console.log(error.message);
  } 
  }





