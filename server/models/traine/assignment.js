import { Schema,model } from "mongoose";

const UserSchema = new Schema({
    name: {
        type: String,
        required:true
    },
    description: {
        type: String,
        required:true,
    },
    interns:{
        type: Array,
        required:true,
    },
    validfrom : {
        type: Date,
        required : true
    },
    validto: {
        type: Date,
        required:true
    }
},{timestamps : true})


const Assignment = model("assignment", UserSchema);
export default Assignment