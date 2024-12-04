import { Application } from "../models/application.js";
import { Job } from "../models/job.js";

export const applyJob = async(req,res)=>{
    try {

        const userId = req.id;
        const jobId = req.params.id;
       if(!jobId){
        return res.status(401).json({
            message:"Company id is required..",
            success:false
        })
       }

       const cheakApply = await Application.findOne({job:jobId , applicant:userId});
       if(cheakApply){
        return res.status(400).json({
            message:"you alredy applied..",
            success:false
        })
       };

       const job = await Job.findById(jobId);
       if(!job){
        return res.status(404).json({
            message:"job not found..",
            success:false
        })
       }

       const application = await Application.create({
        job:jobId,
        applicant:userId,

       });
        //  to push applications in job
       job.applications.push(application._id);
       await job.save();
       return res.status(201).json({
        message:"you applied successfully..",
        success:true
       })
        
    } catch (error) {
        console.log(error);
    }
}

export const getAppliedJobs = async(req,res)=>{
    try {
        const userId = req.id;
        const applieds = await Application.find({applicant:userId}).sort({createdAt:-1}).populate({
            path:'job',
            options:{sort:{createdAt:-1}},
            populate:{
                path:'company',
                options:{sort:{createdAt:-1}},
            }
        })

        if(!applieds){
            return res.status(404).json({
                message:"No Applied ",
                success:false
            })
        }

        return res.status(200).json({
            applieds,
            success:true
        })
        
    } catch (error) {
        console.log(error);
    }
}


export const getApplications = async(req,res)=>{
    try {

        const jobId = req.params.id;
        const applications = await Job.findById(jobId).populate({
            path:'applications',
            options:{sort:{createdAt:-1}},
            populate:{
                path:'applicant'
            }
        })
        if(!applications){
            return res.status(404).json({
                message:"No Applications ",
                success:false
            })
        }
        return res.status(200).json({
            applications,
            success:true
        })


    } catch (error) {
        console.log(error);
    }
}

export const updateStatus = async(req,res)=>{
    try {
        const {status} = req.body;
        const applicationId = req.params.id;
        if(!status){
            return res.status(404).json({
                message:"status is required..",
                success:false
            })
        }

        const application = await Application.findById(applicationId);
        if(!application){
            return res.status(404).json({
                message:"application not found..",
                success:false
            })
        }

        application.status = status.toLowerCase();
        await application.save();

        return res.status(200).json({
           message:"Status update successfully..",
            success:true
        })

    } catch (error) {
        console.log(error);
    }
}