import mongoose, { Schema, model } from "mongoose";

const UserSchema = new Schema({
    name: {
        type: String,
        required:true
    },
    email: {
        type: String,
        required:true,
        unique: true
    },
    image:{
        type: String,
        required:true,
        unique:true
    },
    trainerReference : {
        type: String,
        required : true
    },
    batch: {
        type: String,
        required:true
    }
},{timestamps : true})


const TrainerIntern = model("trainerintern", UserSchema);
export default TrainerIntern