
import UUser from "../../models/Admintraine.js";
import Intern from "../../models/admIntern.js";
import Assignment from "../../models/traine/assignment.js";
import TrainerBatch from "../../models/traine/trainerBatch.js";



export const getTrainerIntern = async(req,res)=>{
    const {id} = req.params;
    try {
      const result = await Intern.find({trainerReference:id});
      res.json(result);
    } catch (error) {
      res.json({message : error.message})
    }
  }


  export const createAssignment = async(req,res)=>{
    
    const { name,description,batch,interns,validfrom,validto,Assignedby  } = req.body;

    if (!name) {
      return res.status(400).json({ message: "name is required" });
    }
    if (!description) {
      return res.status(400).json({ message: "Enter your question" });
    }
    if (!batch) {
      return res.status(400).json({ message: "Batch required" });
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

    // console.log(batch,'batch')

    let product = await Assignment({name,description,batch,interns,validfrom,validto,Assignedby});

    try {
   
      let response = await product.save();
      res.json({response : response , status :true});
    } catch (error) {
      console.log({message: error.message, status:false});
      res.json({response : error.message , status :false});

    }

  }


  export const updateassignment= async(req,res)=>{
    const {id} = req.params;
    const {name,description,batch,interns,validfrom,validto,Assignedby } = req.body;
    if(!name) {
      return res.status(400).json({message:"Name is required"})
    }
    if(!description) {
      return res.status(400).json({message:"description is required"})
    }
    if (!batch) {
      return res.status(400).json({ message: "Batch required" });
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
        const updatedUser = await Assignment.findByIdAndUpdate(id,{$set:{ name,description,batch,interns,validfrom,validto,Assignedby }},{new:true});
        res.status(201).json(updatedUser);
    } catch (error) {
      res.json({response : error.message , status :false});
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
      try {
        let response = await Assignment.find();

        res.status(200).json(response)

      } catch (error) {
        console.log(error,'rrr');
          res.json(error.message);
      }
  }

  export const getAssignOneID = async(req,res)=>{
    const {id} = req.params;
   try {
    const result = await Assignment.findById(id)

    // let getIntern = result.map(async(item) =>{
    //   const {...other} = item;
    //    const batch = await TrainerBatch.findById(item.batch);
       
    //    if(batch){
    //     const { ...batchOther } = batch


    //     let r =  await Promise.all( item.interns.map(async(idOfIntern)=>{
    //     const internall = await Intern.findById(idOfIntern);  
    //     const {...others} = internall
    //     return {...others._doc}

    //       }) )        

    //     return {...other._doc,BatchName:batchOther._doc.name,studentData:r }
    //   }else{
    //     return other._doc
    //   }
    // })

    // const getinternn = await Promise.all(getIntern);
    // console.log(getinternn,'getIntern');
    res.status(200).json(result);
  } catch (error) {
    res.json({ message: error.message, status: false });
  }
}

  export const getAssignID = async(req,res)=>{
    const {id} = req.params;
   try {
    const result = await Assignment.find({Assignedby:id});

    let getIntern = result.map(async(item) =>{
      const {...other} = item;
       const batch = await TrainerBatch.findById(item.batch);
       
       if(batch){
        const { ...batchOther } = batch

        let r =  await Promise.all( item.interns.map(async(idOfIntern)=>{
          console.log(idOfIntern,"fjfh");
        const internall = await Intern.findById(idOfIntern);  
        const {...others} = internall
        return {...others._doc}

          }) )      
          
          return {...other._doc,BatchName:batchOther._doc.name,studentData:r }
        }else{
          return other._doc
        }
      })
      
      const getinternn = await Promise.all(getIntern);
      // console.log(getinternn,'getIntern');
    res.status(200).json(getinternn);
    return true
  } catch (error) {
    res.json({ message: error.message, status: false });
  }
}


export const trainerBatchName = async(req,res)=>{
  const {id} = req.params;
  try {
    const result = await TrainerBatch.find({interns:id});
    res.json(result);
    console.log(result,"arrrrrrrr");
  } catch (error) {
    res.json({message : error.message})
  }
}
  