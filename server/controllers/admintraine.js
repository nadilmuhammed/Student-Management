import UUser from "../models/update.js";

export const createtraine = async(req,res)=>{
    const { name,email,batch } = req.body;
    console.log(req.body);
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







