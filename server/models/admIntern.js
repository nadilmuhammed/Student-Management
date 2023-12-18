import mongoose, { Schema, model } from "mongoose";

const UserSchema = new Schema({
    Assignedby:{
        type: String,
    },

    // ASS:
    // AASS:['ADMIN'TRAINER]
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
    },
    batchnumber:{
        type: String,
    }
},{timestamps : true})


const Intern = model("intern", UserSchema);
export default Intern