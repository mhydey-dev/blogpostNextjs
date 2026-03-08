import mongoose from "mongoose"
import {string} from "zod"


const blogSchema = new mongoose.Schema({
  title:{type:String,  required:true},
  excerpt:{type:String,  required:true},
  content:{type:String,  required:true},
  author:{type:String,  required:true},
  image:{type:String,  required:true},
  category:{type:String,  required:true}


},{timestamps:true})


const blogmodel = mongoose.models.blogs || mongoose.model("blogs", blogSchema)

export default blogmodel