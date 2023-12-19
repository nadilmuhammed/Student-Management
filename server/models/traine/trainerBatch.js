import { model,Schema } from "mongoose";

const traineSchema = new Schema({
    name:{
        type:Number,
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