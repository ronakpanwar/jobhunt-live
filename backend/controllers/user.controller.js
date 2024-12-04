import { User } from "../models/user.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudindury.js";

export const register = async(req,res)=>{
    try {
        const {fullname , email , password , phoneNo , role} = req.body;
        
        if(!fullname || !email || !password  || !phoneNo || !role){
            return res.status(400).json({
                message:"Somthing missing..",
                success:false
            })
        }

        const file = req.file;
        const fileUrl = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUrl.content);


        const user = await User.findOne({email});
        if(user){
            return res.status(400).json({
                message:"User is alredy exsist..",
                success:false
            })
        }

        const hashPassword =await bcrypt.hash(password , 10);

         await User.create({
            fullname,
            email,
            phoneNo ,
            password:hashPassword,
            role,
            profile :{
                profileImg:cloudResponse.secure_url,
            }
        })
        
        return res.status(201).json({
            message:"Account is created",
            success:true
        })

    } catch (error) { 
        return res.status(400).json({
            message : error,
            
            success:false
        })
        console.log(error)  
    }
}

export const login = async(req , res)=>{
    try {
        const { email , password  , role} = req.body;
        if( !email || !password  || !role){
            return res.status(400).json({
                message:"Somthing missing..",
                success:false
            })
        }

        let user = await User.findOne({email});
        if(!user){
            return res.status(400).json({
                message:"Inccorect email or password ",
                success:false
            })
        }

    const isPasswordCheak = await bcrypt.compare(password , user.password);
    if(!isPasswordCheak){
        return res.status(400).json({
            message:"Inccorect email or password ",
            success:false
        })
    }

    //    cheak the role
    if(role !== user.role){
        return res.status(400).json({
            message:"Account dosn't exsist for this role..",
            success:false
        })
    }
    
    const tokenData = {
        userId:user._id,
    }

    const token =  jwt.sign(tokenData , process.env.SECRET_KEY ,{expiresIn:'1d'});

    user = {
        _id:user._id,
        fullname:user.fullname,
        email:user.email,
        phoneNo:user.phoneNo,
        role:user.role,
        profile:user.profile
    };
    
    return res.status(200).cookie('token',token , {maxAge:1*24*60*60*1000 , sameSite:'strict'}).json({
        message:`welcome back ${user.fullname}`,
        user,
        success:true
    })


    } catch (error) {
        console.log(error)
    }
}

export const logout = async(req,res)=>{
    try {
         return res.status(200).cookie('token' ,'' ,{maxAge:0}).json({
            message:'You Logged Out Successfully..',
            success:true
         })

    } catch (error) {
        console.log(error) 
    }
}

export const updateProfile = async(req,res)=>{
    try {
        const { fullname,email , phoneNo  , bio , skills} = req.body;
  
        const file = req.file;
        const fileUrl = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUrl.content);
       


       let skillsArray;
        if(skills){
            skillsArray = skills.split(",");
        }
       
        const userId = req.id;

        let user = await User.findById(userId);
        if(!user){
            return res.status(400).json({
                message:"User not found.",
                success:false
            })
        }

        // update user information
        if(fullname)user.fullname = fullname
        if(email)user.email = email
        if(phoneNo)user.phoneNo = phoneNo
        if(bio)user.profile.bio = bio
        if(skills)user.profile.skills = skillsArray
       
        if(cloudResponse){
            user.profile.resume = cloudResponse.secure_url // save in cloudindury 
            user.profile.resumeOrignalName = file.originalname
        }  
        

        await user.save();
 
        user = {
            _id:user._id,
            fullname:user.fullname,
            email:user.email,
            phoneNo:user.phoneNo,
            role:user.role,
            profile:user.profile
        };

        return res.status(201).json({
            message:"Profile update Successfully..",
            user,
            success:true
        })


        
    } catch (error) {
        console.log(error);
    }
}