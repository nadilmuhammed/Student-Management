import TrainerIntern from "../../models/traine/intern.js";




export const createtrainerIntern = async(req,res)=>{
    const { name,email,trainerReference,batch } = req.body;
    console.log(req.body);
    if(!name) {
      return res.status(400).json({message:"Name is required"})
    }
    if(!email) {
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

    let product = await TrainerIntern({name,email,trainerReference,image:ImagePath,batch})
    console.log(req.body, "req.body");

  try {
    const result = await product.save();
    console.log(result);
    res.json({ result: result, status: true });
  } catch (error) {
    res.json({ message: error.message, status: false });
  }
}