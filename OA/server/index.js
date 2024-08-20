import express from 'express';
import { connectDB } from './config/db.js';
import cors from "cors";
import 'dotenv/config'
import userRouter from './routes/userRoutes.js';

const app=express();
const port=8008;



app.use(express.json());
app.use(cors());

connectDB();

app.use('/api/user',userRouter);


app.listen(port,(req,res)=>{
    console.log(`Connected to post ${port}`);
})