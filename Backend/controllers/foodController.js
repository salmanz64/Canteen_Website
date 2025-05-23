import mongoose from "mongoose";
import fs from "fs"
import foodModel from "../models/foodModel.js";


const addFood = async(req,res)=>{

    const image_file_name = `${req.file.filename}`;


    const food = new foodModel({
        name: req.body.name,
        price: req.body.price,
        category:req.body.category,
        description:req.body.description,
        image:image_file_name
    })
   

    try{
        await food.save()
        res.json({success:true,message: "Food Added"})
    }catch(error){
        console.log(error)

        res.json({
            success:false,message:"Food Add Failed"
        })
    }
}


const listFoods = async(req,res)=>{


    try{
        const allfoods = await foodModel.find({})
        res.json({success:true,data: allfoods})
    }catch(error){
        res.json({success:false,message:'error'})
    }

}



const removeFood = async(req,res)=>{
    try{
        const food = await foodModel.findById(req.body.id);
        fs.unlink(`uploads/${food.image}`,()=>{})
        await foodModel.findByIdAndDelete(req.body.id)
        
        res.json({
            success:true,message:"Food Removed"
        })
    }catch(error){
        res.json({
            success:false,message:"error"
        })
    }
}
export {addFood,listFoods,removeFood}