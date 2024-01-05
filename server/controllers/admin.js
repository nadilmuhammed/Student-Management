import Admin from "../models/Admin.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    if (!username) {
      return res.status(400).json({ message: "username is required" });
    }
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }
    if (!password) {
      return res.status(400).json({ message: "Password is required" });
    } else if (password.length < 8 || password.length > 16) {
      return res.status(400).json({ message: "Password must be between 8 and 16 characters" });
    }


    const saltRounds = 10;

    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);
    const newAdmin = new Admin({ username, email, password: hash });
    const savedAdmin = await newAdmin.save();
    res.status(200).json(savedAdmin);
  } catch (error) {
    console.log(error);
  }
};


export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
   
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }
    
    if (!password) {
      return res.status(400).json({ message: "Password is required" });
    } else if (password.length < 8 || password.length > 16) {
      return res.status(400).json({ message: "Password must be between 8 and 16 characters" });
    }

    const user = await Admin.findOne({ email: email });

    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    const isPassword = await bcrypt.compare(req.body.password, user.password);

    if (isPassword) {
      const token = jwt.sign({ userId: user._id, username: user.username }, 'your-secret-key', { expiresIn: '1 days' });
      res.json({result:user,token:token});
    } else {
      res.status(404).json({ message: "Incorrect password" });
    }

  } catch (error) {
    console.log({message : error.message, status:false});
  }
};

export const updateadmin= async(req,res)=>{
  const {id} = req.params;
  console.log(id)


  try {
    console.log(req.body,'ugyfg');
    const {username, email, password} = req.body;
    if (!username) {
      return res.status(400).json({ message: "username is required" });
    }
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }
    if (!password) {
      return res.status(400).json({ message: "Password is required" });
    } else if (password.length < 8 || password.length > 16) {
      return res.status(400).json({ message: "Password must be between 8 and 16 characters" });
    }

    const saltRounds = 10;

    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);
      const updatedUser = await Admin.findByIdAndUpdate(id,{$set:{username, email, password:hash}},{new:true});

      res.status(201).json(updatedUser);
  } catch (error) {
    console.log('errr',error);
      res.json(error.message);
  }
}

export const getadminID = async(req,res)=>{
  let { id } = req.params;
  try {
    let response = await Admin.findById(id);
    res.status(202).json(response);
  } catch (error) {
    console.log(error.message);
  }

}


export const getadmin = async(req,res)=>{
  try {
    const result = await Admin.find(); 
    console.log(result);
    res.status(200).json(result);
  } catch (error) {
    res.json(error.message);
  }
} 





