import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./config/db.js";
import router from "./routes/products.route.js";


dotenv.config()

const app = express();

app.use(express.json());

app.use("/api/products",router);

let port = process.env.PORT || 1000;

app.listen(port,()=>{
    connectDb()
    console.log(`Server started on http://localhost:${port}`)
})

app.get("/",(req,res)=>{
    return res.send("Server Started")
})

