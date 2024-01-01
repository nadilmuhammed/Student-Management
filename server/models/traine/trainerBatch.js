import { model,Schema } from "mongoose";

const traineSchema = new Schema({
    Assignedby : {
        type:String
    },
    name:{
        type:String,
        required:true,
        unique:true
    },
    interns:{
        type:Array,
        required:true,
    }
},{ timestamps: true })

const TrainerBatch = model("trainerbatch", traineSchema);
export default TrainerBatch;