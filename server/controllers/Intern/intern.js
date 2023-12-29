
import Intern from "../../models/admIntern.js";
import jwt from "jsonwebtoken";



export const Internlogin = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      console.log(req.body,"data");
     
      if (!email) {
        return res.status(400).json({ message: "Email is required" });
      }

      if (!password) {
        return res.status(400).json({ message: "Password is required" });
      } else if (password.length < 8 || password.length > 16) {
        return res.status(400).json({ message: "Password must be between 8 and 16 characters" });
      }
  
      const user = await Intern.findOne({ email:email,password:password });

      if (!user) {
        return res.status(404).json({ message: "User not found!" });
      }
  
      if (password) {
        const token = jwt.sign({ userId: user._id, email: user.email, }, 'your-secret-key', { expiresIn: '1 days' });
        res.json({result:user,token:token});
      } else {
        res.status(404).json({ message: "Incorrect password" });
      }

    } catch (error) {
      console.log(error.message); 
    }
  };


  export const updateInternLogin = async(req,res)=>{
    const { id } = req.params;
    const { name,email,password } = req.body;

    try {
    if(!name){
        return res.status(400).json({message : "Name is required"})
    }

    if(!email){
        return res.status(400).json({message : "email is required"})
    }

    if(!req.file){
        return res.status(400).json({message : "Image is required"})
    }

    if(!password){
        return res.status(400).json({message : "password is required"})
    }else if(password.length < 8 || password.length > 16){
        return res.status(400).json({message : "Password should have at least 8 character and maximum 16 character"});
    }

    const imagePath = req.file.filename;

    const updatedResult = await Intern.findByIdAndUpdate(id,{$set:{name,email,password,image:imagePath}});
    res.status(200).json(updatedResult)
    console.log(updatedResult,"jhdjhasd");
        
    } catch (error) {
        console.log({message : error.message, status:false});
    }
  }



  
  export const getInternDetailsID = async(req,res) =>{
    const { id } = req.params
    try {
        let response = await Intern.findById(id);
        res.status(200).json(response)
    } catch (error) {
        console.log({message : error.message, status:false});
    }
  }


  export const getInternDetails = async(req,res) =>{
    try {
        let response = await Intern.find();
        res.status(200).json(response)
    } catch (error) {
        console.log({message : error.message, status:false});
    }
  }