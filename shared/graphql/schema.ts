
import { mergeTypeDefs, mergeResolvers } from "@graphql-tools/merge"

import { usertypeDefs } from "./userTypedefs"
import { userresolvers } from "./userResolver"
import { blogresolvers } from "./blogResolvers"
import { blogTypeDefs } from "./blogTypedef"

export const typeDefs = mergeTypeDefs([
  usertypeDefs,
  blogTypeDefs
]) 


export const resolvers = mergeResolvers([
  userresolvers,
  blogresolvers
  
])