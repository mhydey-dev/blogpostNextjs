export const usertypeDefs = `
type user {
  id: ID!
  name: String
  email: String
  role: String
  createdAt:String
}
type response{
  status:String!
  token:String
}


 type Query{
 users: [user]
 oneuser(id:ID):user
 }

 type Mutation{
  createuser(name: String!, email: String!,  role: String!, password:String!):user
  loginuser(email:String! , password:String!):response
 }

` 