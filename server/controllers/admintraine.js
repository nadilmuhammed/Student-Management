import UUser from "../models/update.js";

export const createtraine = async(req,res)=>{
    const { name,email,batch } = req.body;
    console.log(req.body);
    if(!name) {
      return res.status(400).json({message:"Name is required"})
    }
    if(!email) {
      return res.status(400).json({message:"Email is required"})
    }
    if(!batch) {
      return res.status(400).json({message:"Batch is required"})
    }
    let product = await UUser({name,email,batch})
    console.log(req.body, "req.body");

  try {
    const result = await product.save();
    console.log(result);
    res.json({ result: result, status: true });
  } catch (error) {
    res.json({ message: error.message, status: false });
  }
}


export const updatetraine= async(req,res)=>{
  const {id} = req.params;
  console.log(id)
  const {name, email, batch} = req.body;

  try {
      const updatedUser = await UUser.findByIdAndUpdate(id,{$set:{name, email, batch}},{new:true});
      res.status(201).json(updatedUser);
  } catch (error) {
    console.log('errr',error);
      res.json(error.message);
  }
}

export const deletetraine = async(req,res)=>{
  console.log("delte", req.params);
  const { id } = req.params;
  try {

    const result = await UUser.findByIdAndDelete(id);
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

export const getraine = async(req,res)=>{
  try {
    const result = await UUser.find(); 
    console.log(result);
    res.status(200).json(result);
  } catch (error) {
    res.json(error.message);
  }
} 














