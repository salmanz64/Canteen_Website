import orderModel from "../models/orderModel.js";
import UserModel from "../models/userModel.js";
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

const placeOrder = async(req,res) =>{

    

    try{
        const newOrder = new orderModel({
            userId:req.body.userId,
            items:req.body.items,
            amount:req.body.amount,
            address:req.body.address
        })
        await newOrder.save()
        await UserModel.findByIdAndUpdate(req.body.userId,{cartData:{}})

        const line_items = req.body.items.map((item)=>({
            price_data:{
                currency:"inr",
                product_data:{
                    name:item.name
            },
            unit_amount:item.price * 100 * 80
        },
    quantity:item.quantity
    }))

    line_items.push({
        price_data:{
            currency:"inr",
            product_data:{
                name:"Delivery Charges"
            },
            unit_amount:2*100*80
        },
        quantity:1
    })
    let frontendUrl = 'http://localhost:5173'
    const session = await stripe.checkout.sessions.create({
        line_items:line_items,
        mode:'payment',
        success_url:`${frontendUrl}/verify?success=true&orderId=${newOrder._id}`,
        cancel_url:`${frontendUrl}/verify?success=false&orderId=${newOrder._id}`
    })

    res.json({success:true,session_url:session.url})
    }catch(e){
        res.json({success:false,message:"Error"})
    }

}


const verifyOrder  = async (req,res) =>{
    const {orderId,success} = req.body;
    try{
        if(success == 'true'){
            await orderModel.findByIdAndUpdate(orderId,{payment:true})
            res.json({success:true,message:"Paid"})
        }else{
            await orderModel.findByIdAndDelete(orderId)
            res.json({success:false,message:"Not Paid"})
        }
    }catch(e){
        res.json({success:false,message:""})
    }
}

const userOrders =async (req,res) =>{
    try{
        const orders = await orderModel.find({userId:req.body.userId})
        res.json({success:true,data:orders})

    }catch(error){
        res.json({success:false,messagge:"Error"})
    }
}

const listOrders = async (req,res)=>{
    try{
        const orders = await orderModel.find({})
        res.json({success:true,data:orders})
    }catch(e){
        res.json({success:false,message:"Error"})
    }
}
const updateStatus =async (req,res) =>{
    try{
        await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status})
        res.json({success:true,"message":"Status Updated"})
    }catch(e){
        res.json({success:false,message:"Error"})
    }
}

export { placeOrder,verifyOrder,userOrders,listOrders,updateStatus}