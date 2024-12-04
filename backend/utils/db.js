import mongoose  from "mongoose";

const connectDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000, // Adjust the timeout as needed
  });
        console.log("mongodb is connected");
    } catch (error) {
        console.log(error);
    }
}

export default connectDB;
