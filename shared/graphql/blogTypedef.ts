export const blogTypeDefs = `
type blog{
id:ID
title:String
content:String
excerpt:String
author:String
category:String
image:String
createdAt:String
}
type Query{
 allblog: [blog]
 }

type Mutation{
addblog(title:String!, content:String!, excerpt:String!, category:String!, image:String!, author:String!):blog
}`