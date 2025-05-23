import mongoose from "mongoose";


export const connectDB = async ()=>{
    await mongoose.connect('mongodb+srv://salmannoushad003:8943754988@cluster0.bmlet.mongodb.net/food-del').then(()=>{
        console.log("MangoDB connected");
    })
}

