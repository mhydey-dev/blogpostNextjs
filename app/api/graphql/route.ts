import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { typeDefs, resolvers } from "@/shared/graphql/schema";
import connect from "@/shared/database/db.connect";
import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

interface Context {
  user?: string | jwt.JwtPayload;
}

const handler = startServerAndCreateNextHandler<NextRequest>(server, {
  context: async (req): Promise<Context> => {
    try {
      const cookie = req.headers
        .get("cookie")
        ?.split(";")
        .find((c) => c.trim().startsWith("auth_token="));
      const token = cookie?.split("=")[1];
      if (!token) {
        return {};
      }
      const verifieduser = await jwt.verify(token, "secretkey");
      if (verifieduser) {
        return { user: verifieduser };
      }
      return {};
    } catch (error) {
      throw new Error();
    }
  },
});

export async function GET(req: Request) {
  return handler(req);
}

export async function POST(req: Request) {
  return handler(req);
}

connect();
