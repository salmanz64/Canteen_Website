import UserModel from "../models/userModel.js"; 

const addToCart = async(req,res) =>{
    try{
        let userData = await UserModel.findOne({_id:req.body.userId})
        const cartData = userData.cartData;
        if(!cartData[req.body.itemId]){
            cartData[req.body.itemId] = 1
        }else{
            cartData[req.body.itemId] +=1
        }
        await UserModel.findByIdAndUpdate(req.body.userId,{cartData})
        res.json({success:true,message:"Product Added"})
    }catch(e){
        res.json({success:false,message:"Error"})
    }
}
  

const removeFromCart=async (req,res)=>{
    try{
        let userData = await UserModel.findOne({_id:req.body.userId})
        const cartData = userData.cartData;
        if(cartData[req.body.itemId>0]){
            cartData[req.body.itemId]-=1
        }

        await UserModel.findByIdAndUpdate(req.body.userId,{cartData})
        res.json({success:true,message:"Product Removed"})
    }catch(e){
        res.json({success:false,message:"Error"})
    }
}

const getFromCart= async(req,res)=>{
    try{
        let userData = await UserModel.findOne({_id:req.body.userId})
        const cartData = userData.cartData;
        res.json({success:true,cartData})
    }catch(e){
        res.json({success:false,message:"Error"})
    }
}


export {addToCart,removeFromCart,getFromCart}