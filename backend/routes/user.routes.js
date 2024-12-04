import {Router} from "express"
import { login, logout, register, updateProfile } from "../controllers/user.controller.js";
import isAutherized from "../midlewere/isAutherized.js";
import { singleUpload } from "../midlewere/multer.js";

const router = Router();

router.post('/register' , singleUpload, register);
router.post('/login' , login);
router.post('/profile/update' ,isAutherized,singleUpload, updateProfile);
router.get('/logout' , logout) 

export default router;