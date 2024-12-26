import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config()

// console.log(process.env.MONGO_URI);

export const connectDb = async ()=>{
    try{
    const conn = await mongoose.connect(process.env.MONGO_URI)
    console.log(`MongoDb connected : ${conn.connection.host}`);
    }catch(error){
        console.log(`Error : ${error.message}`)
        process.exit(1); //exit code 1 means exit with failure
    }
}
