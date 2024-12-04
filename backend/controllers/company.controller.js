import { Company } from "../models/company.js";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudindury.js";

export const registerCompany = async (req,res)=>{
    try {
    
        const {companyName} = req.body;
       if(!companyName){
        return res.status(404).json({
            message:"Somthing Missing..",
            success:false
        })
       };

       let company = await Company.findOne({name:companyName});
       if(company){
        return res.status(404).json({
            message:"You can't create exsist Company..",
            success:false
        })
       }

       company = await Company.create({
        name:companyName,
        userId:req.id
       });

       return res.status(200).json({
        message:"Create company successfully..",
        success:true,
        company
       })

        
    } catch (error) {
        console.log(error)
    }
}

export const getCompany = async (req,res)=>{
    try {
        const company = await Company.find({userId:req.id});
        if(!company){
            return res.status(400).json({
                message:"Companies not found..",
                success:false
            })
        };
      
        return res.status(200).json({
            
            company, 
            success:true
        })
    } catch (error) {
        console.log(error)
    }
}


export const getCompanyById = async(req,res)=>{
    try {
        const companyId = req.params.id;
        const company = await Company.findById(companyId);
        if(!company){
            return res.status(400).json({
                message:"Company not found..",
                success:false
            })
        }
        return res.status(200).json({
            company , 
            success:true
        })
    } catch (error) {
        console.log(error)
    }
}


export const updateCompany = async(req,res)=>{
    try {
        const {name, description ,website , location} = req.body;
        const file = req.file;
        

        const fileUrl = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUrl.content);
        const logo = cloudResponse.secure_url;

        const formData = { name, description ,website , location , logo};
        const company = await Company.findByIdAndUpdate(req.params.id , formData , {new :true});
        if(!company){
            return res.status(400).json({
                message:"Company not found..",
                success:false
            })
        }

        return res.status(200).json({
            message:"Comapny update..",
            success:true
        })
    } catch (error) {
        console.log(error)
    }
}