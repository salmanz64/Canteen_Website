import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,

    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        
    },
    cartData:{
        type:Object,
        default:{}
    }
},
//the minimize false is requried since we are sending an empty data cartData
{minimize:false})

const UserModel = mongoose.models.user || mongoose.model("user",userSchema)

export default UserModel