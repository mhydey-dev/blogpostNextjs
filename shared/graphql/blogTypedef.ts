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

type blogid {id:ID}

type author {name: String}

type Query{
 allblog(page:Int, limit:Int): [blog]
 }

 type Query{
  blog(id: ID): blog
 }

 type Query{
 allauthor: [author]
 }

type Mutation{
addblog(title:String!, content:String!, excerpt:String!, category:String!, image:String!, author:String!):blog
}

type Mutation{
editblog(id: ID, title:String!, content:String!, excerpt:String!, category:String!, image:String!, author:String!):blog
}

type Mutation{
deleteblog(id: ID): blogid
}
`;
