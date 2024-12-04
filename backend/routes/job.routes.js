import {Router} from "express";
import isAutherized from "../midlewere/isAutherized.js";
import { getAdminJobs, getAllJobs, getJobById, postJob } from "../controllers/job.controller.js";


const router = Router();

router.post('/post' , isAutherized , postJob);
router.get('/get' , isAutherized , getAllJobs);
router.get('/getadmin' , isAutherized , getAdminJobs)
router.get('/get/:id' , isAutherized , getJobById)

export default router;