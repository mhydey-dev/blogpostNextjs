import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
  name:{type:String, required:true, trim:true},
  email:{type:String, unique:true, required:true},
  role:{type:String, enum:["user", "admin"],default:"user", required:true},
  password:{type:String, required:true}
},{timestamps:true})



export const usermodel = mongoose.models.users ||  mongoose.model("users", userSchema)