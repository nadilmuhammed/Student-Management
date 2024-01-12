import mongoose, { Schema, model } from "mongoose";

const UserSchema = new Schema({
    batch: {
        type: String,
        required:true,
        unique:true 
    },
    trainerReference : {
        type: Array,
        required : true
    }
 
},{timestamps : true})


const Batch = model("batches", UserSchema);
export default Batch