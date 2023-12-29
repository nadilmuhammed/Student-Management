import { model,Schema } from "mongoose";

const traineSchema = new Schema({
    name: {
        type: String,
        required:true,
    },
    email: {
        type: String,
        required:true,
        unique: true
    },
    username: {
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
    },
    image:{
        type: String,
        required: true,
        unique:true
    },
    id_no:{
        type: Number,
        reqired:true,
        unique:true
    }
},{ timestamps: true })

const Traine = model("sign", traineSchema);
export default Traine;