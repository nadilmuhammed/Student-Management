import { model,Schema } from "mongoose";

const traineSchema = new Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    id_no:{
        type:Number,
        required:true,
        unique:true
    }
},{ timestamps: true })

const Traine = model("sign", traineSchema);
export default Traine;