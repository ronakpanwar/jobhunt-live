import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullname:{
        type:String , 
        required:true
    },
    email:{
        type:String , 
        required:true,
        unique:true
    },
    password:{
        type:String , 
        required:true
    },
    phoneNo:{
        type:Number,
        required:true
    },
    role:{
        type:String,
        enum:['student','recruiter'],
        required:true
    },
    profile:{
        bio:{type:String},
        skills:[{type:String}],
        resume:{type:String} ,// for store url of resume
        resumeOrignalName:{type:String},
        company:{type:mongoose.Schema.Types.ObjectId,
            ref:'Company'
        },
        profileImg:{type:String , default:""}
    }
},{timestamps:true})

export const User = mongoose.model('User' , userSchema);