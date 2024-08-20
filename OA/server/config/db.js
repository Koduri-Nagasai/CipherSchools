import mongoose from "mongoose";

export const connectDB= async ()=>{
    await mongoose.connect('mongodb+srv://koduri_nagasai:Nagasai2003@cluster0.vaxre.mongodb.net/test-org').then(()=>console.log("DB Connected"))
}
