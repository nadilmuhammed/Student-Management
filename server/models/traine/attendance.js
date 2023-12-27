import { Schema,model } from "mongoose";

const UserSchema = new Schema({
    

},{timestamps:true});

const Attendance = model("attendance" , UserSchema);
export default Attendance