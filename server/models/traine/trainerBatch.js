import { model,Schema } from "mongoose";

const traineSchema = new Schema({
    name:{
        type:String,
        unique:true
    },
    interns:{
        type: String,
        required:true
    }
},{ timestamps: true })

const TrainerBatch = model("trainerbatch", traineSchema);
export default TrainerBatch;