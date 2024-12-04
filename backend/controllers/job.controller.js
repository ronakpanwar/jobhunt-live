import { Job } from "../models/job.js";

export const postJob = async(req,res)=>{
    try {

        const {title , description , requirments , salary , location , experience ,jobType , position ,companyId } = req.body;
        if(!title || !description || !requirments || !salary || !location || !experience || !jobType || !position|| !companyId){
            return res.status(400).json({
                message:"Somthing missing..",
                success:false
            })
        }

        const userId = req.id;

        const job = await Job.create({
            title,
            description,
            requirments:requirments.split(","),
            salary:Number(salary),
            location,
            experience,
            jobType,
            position,
            company:companyId,
            created_by:userId

        })

        return res.status(201).json({
            message:"Job created...",
            job,
            success:true
        })
        
    } catch (error) {
        console.log(error);
    }
}

export const getAllJobs = async(req,res)=>{
    try {
        
      const keyword = req.query.keyword || "";
      const query ={
        $or:[
            {title:{$regex:keyword, $options:"i"}},
            {description:{$regex:keyword , $options:"i"}}
        ]
      };

      const job = await Job.find(query).populate({path:'company'});
      if(!job){
        return res.status(404).json({
            message:"Job not found",
            success:false
        })
      }

      return res.status(201).json({
        job,
        success:true
      })

    } catch (error) {
        console.log(error);
    }
}

export const getJobById = async (req,res)=>{
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({path:'applications'});
        if(!job){
            return res.status(404).json({
                message:"Job not found",
                success:false
            })
        }
        // console.log(job);

        return res.status(200).json({
            job ,
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}


export const getAdminJobs = async(req,res)=>{
    try {
        const adminId = req.id;
        const job = await Job.find({created_by:adminId}).populate({
            path:'company'
        });
        if(!job){
            return res.status(404).json({
                message:"Job not found",
                success:false
            })
        }

        return res.status(200).json({job , success:true})

    } catch ({error}) {
        console.log(error);
    }
}