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
    batch: {
        type: String,
        required:true
    }
},{timestamps : true})



const UUser = model("user", UserSchema);
export default UUser