import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv"
import bodyParser from 'body-parser'
import connectDB from "./utils/db.js";
import userRoute from './routes/user.routes.js'
import companyRoute from './routes/company.routes.js'
import jobRoute from './routes/job.routes.js'
import applicationRoute from './routes/application.routes.js'
import path from "path"
dotenv.config({});
const app = express();
connectDB()
const PORT = process.env.PORT || 8080;
const _dirname = path.resolve();

// midlewere 
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

const  corsOptions  = {
    origin:"http://localhost:5173",
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials:true
}
app.use(cors(corsOptions));

// all apis

app.use('/api/user' , userRoute);
app.use('/api/company' , companyRoute );
app.use('/api/job', jobRoute )
app.use('/api/application' , applicationRoute)


app.use(express.static(path.join(_dirname, "/frontend/dist")));
app.get('*', (_,res) => {
    res.sendFile(path.resolve(_dirname, "frontend", "dist", "index.html"));
});





app.listen(PORT , ()=>{
   
    console.log(`Server start on port : ${PORT}`);
})
