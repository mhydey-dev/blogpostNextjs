import blogmodel from "../database/model/blog.model"
import cloudinary from "../lib/cloudinary"

type blog = {
title:String
content:String
excerpt:String
author:String
category:String
image:String
createdAt:String
  
}







export const blogresolvers = {
  Query:{
    allblog: async() => {
          const blogs = await blogmodel.find().sort({ createdAt: -1 }).lean()
          return blogs.map((b: Record<string, unknown>) => ({
            ...b,
            id: String(b._id),
            createdAt: b.createdAt instanceof Date ? (b.createdAt as Date).toISOString() : b.createdAt,
          }))
        },

  },

  

  Mutation:{
    addblog: async (_,param:blog)=>{
      try{
        const {title, content, excerpt, author, category, image} = param
        if (!title || !content || !excerpt || !category || !image || !author){
          throw new Error ("All fields are mandatory")
        }

        const uploaded = await cloudinary.uploader.upload(image)
        if(uploaded){
          const newBlog = await blogmodel.create({
            ...param,
            image:uploaded.secure_url
          })
          console.log(newBlog)
          return newBlog
        }
      } catch(error){
        if(error instanceof Error){
          throw new Error(error?.message)
        }
      }

    },
  }
}