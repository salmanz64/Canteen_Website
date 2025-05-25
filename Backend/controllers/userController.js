import mangoose from 'mongoose'
import UserModel from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import validator from 'validator'





//to create a token so can be relogin without auth
const createToken = (id) =>{
    return jwt.sign({id},process.env.JWT_SECRET)
}

const registerUser = async (req,res)=>{
    const {name,email,password} =req.body;

    try{
        //check if user already exist
        const exists = await UserModel.findOne({email})

        if(exists){
            return res.json({success:false,message:"User Already exists"})
        }

        //validate email
        if(!validator.isEmail(email)){
            return res.json({success:false,message:"Please Enter a valid email"})
        }
        if(password.length<8){
            return res.json({success:false,message:"The Password should be atleast 8 "})
        }

        //encrypt the password 10 gives small 50 gives more
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)


        const newUser = new UserModel({
            name:name,
            email:email,
            password:hashedPassword
        })

            const user = await newUser.save()
            const token = createToken(user._id)

            res.json({success:true,token})

    }catch(e){
        res.json({success:false,message:"Error"})
    }

}


const loginUser = async (req,res)=>{
    const {email,password} = req.body;
    try{
        const user = await UserModel.findOne({email})
        if(!user){
            return res.json({success:false,message:"The User Does not Exist"})
        }

        const isMatch =  await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.json({success:false,message:"Invalid Credential"})
        }

        const token = createToken(user._id)

        res.json({success:true,token})
    }catch(e){
        return res.json({success:false,message:"Error"})
    }

}

export {
    registerUser,
    loginUser
}
