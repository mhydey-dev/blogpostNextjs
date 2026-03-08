import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

const protectedRoutes = ['/dashboard','/addblog']

export function proxy(req: NextRequest) {
  const path = req.nextUrl.pathname;

  if (!protectedRoutes.some(route => path.startsWith(route))) {
    return NextResponse.next();
  }
  const cookie = req.cookies.get('auth_token');
  const token = cookie?.value;

  if (!token) {
    const loginUrl = new URL('/login', req.url);
    return NextResponse.redirect(loginUrl);
  }
  return NextResponse.next();
}
