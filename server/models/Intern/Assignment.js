import { Schema,model } from "mongoose";

const UserSchema = new Schema({
    topic : {
        type:String,
        required:true
    },
    question : {
        type:String,
        required:true
    },
    duedate : {
        type:Date,
        required:true
    },
    work : {
        type:String,
        required:true
    },
},{timestamps:true})

const AssignmentIntern = model("internAssignment", UserSchema);
export default AssignmentIntern;