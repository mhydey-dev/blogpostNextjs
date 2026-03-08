import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { typeDefs, resolvers } from "@/shared/graphql/schema";
import connect from "@/shared/database/db.connect";

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const handler = startServerAndCreateNextHandler(server);

const AUTH_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict" as const,
  maxAge: 60 * 60 * 24,
  path: "/",
};

async function withAuthCookie(res: Response): Promise<Response> {
  const clone = res.clone();
  try {
    const json = await clone.json();
    const token = json?.data?.loginuser?.token;
    if (!token) return res;
    const headers = new Headers(res.headers);
    headers.append(
      "Set-Cookie",
      `auth_token=${encodeURIComponent(token)}; Path=/; Max-Age=${AUTH_COOKIE_OPTIONS.maxAge}; SameSite=Strict${AUTH_COOKIE_OPTIONS.secure ? "; Secure" : ""}; HttpOnly`
    );
    return new Response(res.body, {
      status: res.status,
      statusText: res.statusText,
      headers,
    });
  } catch {
    return res;
  }
}

export async function GET(req: Request) {
  const res = await handler(req);
  return withAuthCookie(res);
}

export async function POST(req: Request) {
  const res = await handler(req);
  return withAuthCookie(res);
}

connect();