import mongoose, { Schema, model } from "mongoose";

const UserSchema = new Schema({
    Assignedby:{
        type:String
    },
    name: {
        type: String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    batch:{
        type:String,
        required:true
    },
    interns:{
        type:Array,
        required:true
    },
    file:{
        type:String,
        required:true
    }
    
},{timestamps:true})


const TrainerNotes = model("trainernotes", UserSchema);
export default TrainerNotes