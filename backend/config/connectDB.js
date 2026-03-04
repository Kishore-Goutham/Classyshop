import mongoose from "mongoose";


async function connectDB(){
    try{
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("db connected")
    }catch(err){
        console.log("db error");
        process.exit(1)
    }
}

export default connectDB