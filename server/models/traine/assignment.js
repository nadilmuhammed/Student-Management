import { Schema,model } from "mongoose";

const UserSchema = new Schema({
    Assignedby:{
        type:String
    },
    name: {
        type: String,
        required:true
    },
    description: {
        type: String,
        required:true,
    },
    batch:{
        type:String,
        required:true
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
    },
    statusOfSubmit: {
        type: String,  // Specify that it's an array of strings
        enum: ['Assigned','Approved', 'Rejected', 'Evaluating','submitted'],  // Specify the allowed values
        default: 'Assigned'  // Set the default value to 'submit'
    }
},{timestamps : true})


const Assignment = model("assignment", UserSchema);
export default Assignment