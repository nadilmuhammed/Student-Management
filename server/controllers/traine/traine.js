import Traine from "../../models/traine/traine.js";
import jwt from "jsonwebtoken"
import UUser from "../../models/Admintraine.js";


  export const login = async (req, res, next) => {
    try {
      const { email, password,id_no } = req.body;
      console.log(req.body,"data");
     
      if (!email) {
        return res.status(400).json({ message: "Email is required" });
      }

      if (!password) {
        return res.status(400).json({ message: "Password is required" });
      } else if (password.length < 8 || password.length > 16) {
        return res.status(400).json({ message: "Password must be between 8 and 16 characters" });
      }

      if (!id_no) {
        return res.status(400).json({ message: "ID is required" });
      }else if(!id_no || isNaN(id_no)){
        return res.status(400).json({message:"ID must be valid number"})
      } else if (id_no.length < 4 || id_no.length > 8){
        return res.status(400).json({message:"ID number should have at least 4 digits and maximum of 8 digits."})
      }
  
      const user = await UUser.findOne({ email:email,password:password,id_no:id_no });
      console.log(email,id_no,"data" );

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
      console.log(error); 
    }
  };


  export const updatetraine = async(req,res) =>{
    const {id} = req.params;
    console.log(id);
    const { email,password,id_no } = req.body;
    try {
        let updateuser = await Traine.findByIdAndUpdate(id,{$set:{email,password,id_no}},{new:true});
        res.status(201).json(updateuser);
    } catch (error) {
        res.json(error.message)
    }
  }

  export const deletetraine = async(req,res)=>{
    const {id} = req.params;
    try {
        let response = await Traine.findByIdAndDelete(id);
        res.json(response)
    } catch (error) {
        res.json(error.message)
    }
  }


  export const getData = async(req,res) =>{
    try {
        let response = await Traine.find();
        res.status(202).json(response);
    } catch (error) {
        res.json(error.message);
    }
  }