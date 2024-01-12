import { Schema,model } from "mongoose";

const UserSchema = new Schema({
    Assignedby:{
        type:String
    },
    assignmentid:{
        type:String
    },
    topic : {
        type:String,
    },
    question : {
        type:String,
    },
    duedate : {
        type:Date,
    },
    file : {
        type:String,
        required:true,
        unique:true
    },
    statusOfSubmit: {
        type: [String],  // Specify that it's an array of strings
        enum: ['pending','Approved', 'Rejected', 'Evaluated','Submited','Late submition'],  // Specify the allowed values
        default: ['Submited']  // Set the default value to 'submit'
    },
    likes:[
        {
            isLike: { type: Boolean, required:true }
        }
    ]
},{timestamps : true})

const AssignmentIntern = model("internassignment", UserSchema);
export default AssignmentIntern;