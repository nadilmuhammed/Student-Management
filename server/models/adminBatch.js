import mongoose, { Schema, model } from "mongoose";

const UserSchema = new Schema({
    batch: {
        type: String,
        required:true,
        unique:true
    }
},{timestamps : true})


const Batch = model("batch", UserSchema);
export default Batch