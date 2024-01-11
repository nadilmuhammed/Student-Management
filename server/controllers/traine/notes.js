import { unlink } from "fs"
import Intern from "../../models/admIntern.js"
import TrainerNotes from "../../models/traine/notes.js"
import TrainerBatch from "../../models/traine/trainerBatch.js"


export const createTrainerNotes = async(req,res)=>{
    const { name,description,batch,interns,Assignedby } = req.body

    if(!name){
        return res.status(401).json({message:"name is required"})
    }

    if(!description){
        return res.status(401).json({message:"description is required"})
    }

    if(!batch){
        return res.status(401).json({message:"description is required"})
    }
    if(!interns){
        return res.status(401).json({message:"description is required"})
    }

    if(!req.file){
        return res.status(401).json({message:"Uplaod a file"})
    }

    let FilePath = req.file.filename

    let product = await TrainerNotes({name,description,file:FilePath,batch,interns,Assignedby});

    try {
        let response = await product.save();
        res.status(200).json(response)
    } catch (error) {
        console.log({message : error.message, status:false});
    }
} 



export const getallIdnotes = async(req,res) =>{
    let { id } = req.params;
    try {
        let response = await TrainerNotes.find({Assignedby:id});


        console.log(response,"response");
        let getIntern = response.map(async(item) =>{
            const {...other} = item;
             const batch = await TrainerBatch.findById(item.batch);
             
             if(batch){
              const { ...batchOther } = batch
      

              let r =  await Promise.all( item.interns.map(async(idOfIntern)=>{
                console.log(idOfIntern,"interns");
                // return true
                  const internall = await Intern.findById(idOfIntern);  
                  console.log(internall,"fjfh");
              const {...others} = internall;
              return {...others._doc}
      
                }) );   
                
                return {...other._doc,BatchName:batchOther._doc.name,studentData:r }
              }else{
                return other._doc
              }
            })
            
            const getallinternn = await Promise.all(getIntern);
            // console.log(getinternn,'getIntern');
          res.status(200).json(getallinternn);
            return true
    } catch (error) {
        console.log({message : error.message, status:false});
    }
 }


 export const updateNotes = async(req,res)=>{
    let { id } = req.params;
    const { name,description,batch,interns,Assignedby } = req.body

    if(!name){
        return res.status(401).json({message:"name is required"})
    }

    if(!description){
        return res.status(401).json({message:"description is required"})
    }

    if(!batch){
        return res.status(401).json({message:"description is required"})
    }
    if(!interns){
        return res.status(401).json({message:"description is required"})
    }

    if(!req.file){
        return res.status(401).json({message:"Uplaod a file"})
    }

    const FilePath = req.file.filename

    try {
        let response = await TrainerNotes.findByIdAndUpdate(id,{$set:{name,description,batch,interns,file:FilePath,Assignedby}});
        res.status(202).json(response);

    } catch (error) {
        console.log({message: error.message, status:false});
    }
 }





 export const deleteNotes = async(req,res) => {
    let { id } = req.params;
    try {

        const fileid = await TrainerNotes.findById(id)

        if (!fileid){
            return res.status(404).json({error: "file not found"});
          }

          unlink(`trainernotes/${fileid.file}`, async function(err){
            if(!err){
                console.error("Error deleting file:", err);
            }else {
                console.log("file is deleted!");
                let response = await TrainerNotes.findByIdAndDelete(id);
            }
          })

        res.status(201).json({message:"trainer has deleted", status:false});
    } catch (error) {
        console.log({message: error.message , status: false});
    }
 }

 export const getTrainernotedID = async(req,res)=>{
    let { id } = req.params;
    try {
        let response = await TrainerNotes.findById(id);
        res.status(200).json(response);
    } catch (error) {
        console.log({message: error.message, status:false});
    }
 }


export const getNotes = async(req,res)=>{
    try {
        let response = await TrainerNotes.find();
        res.status(200).send(response);
    } catch (error) {
        console.log(error.message);
    }
}