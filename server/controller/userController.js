import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { findUserByEmail } from "../models/userModel.js";




export const loginUser = async(req,res)=>{
    const {email,password}=req.body;
    try {
        const user = await findUserByEmail(email);

        if(!user) return res.status(400).json({success:false,message:"Invalid credential"})
        
        const isMatch = await bcrypt.compare(password,user.password);
         
 
        if(!isMatch) return res.status(400).json({success:false,message:"Password was not matched"})

         const token = generateToken(user.id);

        res.json({message:"Login successful",token,user:{id:user?.id,name:user.name,email:user.email}});

    } catch (error) {
      return res.error({message:"Api Error"})
    }
}

const generateToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:"1h"}) ;
}