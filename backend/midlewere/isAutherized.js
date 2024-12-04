import jwt from "jsonwebtoken"

const isAutherized = async (req,res,next)=>{
    try {
        const token = await req.cookies.token;
        if(!token){
            return res.status(401).json({
                message:"User not Autherized..",
                success:false
            })
        }

        const decode =  jwt.verify(token , process.env.SECRET_KEY);
        if(!decode){
            return res.status(401).json({
                message:"Invalid token",
                success:false
            })
        }

        req.id = decode.userId;
        next();

    } catch (error) {
        console.log(error);
    }
}

export default isAutherized