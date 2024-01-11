import TrainerNotes from "../../models/traine/notes.js";


export const getallIdnotes = async(req,res) =>{
    let { id } = req.params;
    console.log(id,"id");
    try {
        let response = await TrainerNotes.find({interns:id});

        console.log(response,"response");
        // let getIntern = response.map(async(item) =>{
        //     const {...other} = item;
        //      const batch = await TrainerBatch.findById(item.batch);
             
        //      if(batch){
        //       const { ...batchOther } = batch
      

        //       let r =  await Promise.all( item.interns.map(async(idOfIntern)=>{
        //         console.log(idOfIntern,"interns");
        //         // return true
        //           const internall = await Intern.findById(idOfIntern);  
        //           console.log(internall,"fjfh");
        //       const {...others} = internall;
        //       return {...others._doc}
      
        //         }) );   
                
        //         return {...other._doc,BatchName:batchOther._doc.name,studentData:r }
        //       }else{
        //         return other._doc
        //       }
        //     })
            
        //     const getallinternn = await Promise.all(getIntern);
        //     // console.log(getinternn,'getIntern');
        //   res.status(200).json(getallinternn);
        //     return true
        res.status(200).json(response)
    } catch (error) {
        console.log({message : error.message, status:false});
    }
 }