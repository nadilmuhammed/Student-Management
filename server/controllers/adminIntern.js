import User from "../models/admIntern.js";

 export const createIntern = async(req,res)=>{
    const { name,email,traine,batch } = req.body;
    console.log(req.body);
    if(!name) {
      return res.status(400).json({message:"Name is required"})
    }
    if(!email) {
      return res.status(400).json({message:"Email is required"})
    }
    if(!traine) {
        return res.status(400).json({message:"Traine is required"})
      }
    if(!batch) {
      return res.status(400).json({message:"Batch is required"})
    }
    let product = await User({name,email,traine,batch})
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
    const {name, email,traine, batch} = req.body;
  
    try {
        const updatedUser = await User.findByIdAndUpdate(id,{$set:{name, email,traine,traine}},{new:true});
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
  
      const result = await User.findByIdAndDelete(id);
      res.status(200).json(result)
    } catch (error) {
      res.json({ message: error.message, status: false });
    }
  }


export const getIntern = async(req,res)=>{
    try {
      const result = await User.find(); 
      console.log(result);
      res.status(200).json(result);
    } catch (error) {
      res.json(error.message);
    }
  } 


  export const getInternID = async(req,res)=>{
    const {id} = req.params;
    try {
      const result = await User.findById(id)
      res.json(result );
      return true
    } catch (error) {
      res.json({ message: error.message, status: false });
    }
  }