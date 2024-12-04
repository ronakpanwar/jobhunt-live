import {Router} from "express"

import isAutherized from "../midlewere/isAutherized.js";
import { applyJob, getApplications, getAppliedJobs, updateStatus } from "../controllers/application.controller.js";

const router = Router();

router.get('/apply/:id' ,isAutherized, applyJob);
router.get('/get' ,isAutherized, getAppliedJobs);
router.get('/:id/applicent' ,isAutherized, getApplications);
router.post('/update/:id' ,isAutherized, updateStatus);

export default router;