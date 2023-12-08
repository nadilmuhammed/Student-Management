
import Intern from "../../models/admIntern.js";
import Assignment from "../../models/traine/assignment.js";



export const getTrainerIntern = async(req,res)=>{
    const {id} = req.params;
    console.log(id);
    try {
      const result = await Intern.find({trainerReference:id});
      console.log(result,"result");
      res.json(result);
    } catch (error) {
      res.json({message : error.message})
    }
  }


  export const createAssignment = async(req,res)=>{
    const { name,description,interns,validfrom,validto  } = req.body;

    if (!name) {
      return res.status(400).json({ message: "name is required" });
    }
    if (!description) {
      return res.status(400).json({ message: "Enter your question" });
    }
    if (!interns) {
      return res.status(400).json({ message: "Interns required" });
    }
    if (!validfrom) {
      return res.status(400).json({ message: "set validfrom" });
    }
    if (!validto) {
      return res.status(400).json({ message: "set validto" });
    }

    let product = await Assignment({name,description,interns,validfrom,validto});

    try {
      let response = await product.save();
      res.json({response : response , status :true});
    } catch (error) {
      console.log({message: error.message, status:false});
    }

  }


  export const updateassignment= async(req,res)=>{
    const {id} = req.params;
    console.log(id)
    const {name,description,interns,validfrom,validto } = req.body;
    if(!name) {
      return res.status(400).json({message:"Name is required"})
    }
    if(!description) {
      return res.status(400).json({message:"description is required"})
    }
    if(!interns) {
      return res.status(400).json({message:"interns is required"})
    }
    if (!validfrom) {
      return res.status(400).json({ message: "validfrom is required" });
    } 
    if(!validto) {
      return res.status(400).json({message:"validto an image"})
    }
  
    try {
        const updatedUser = await Assignment.findByIdAndUpdate(id,{$set:{ name,description,interns,validfrom,validto }},{new:true});
        res.status(201).json(updatedUser);
    } catch (error) {
        res.json(error.message);
    }
  }


  export const deleteassignment = async(req,res) => {
    const {id} = req.params;
    try {
      const response = await Assignment.findByIdAndDelete(id);
      res.json({message: "trainer has deleted", status: true});
    } catch (error) {
      console.log({message: error.message, status: false});
    }
  }

  
  
  export const getAssignment = async(req,res) => {
    console.log('llls');
      try {
        let response = await Assignment.find();
        console.log(response,"response");
        res.json(response);

      } catch (error) {
          res.json(error.message);
      }
  }
  