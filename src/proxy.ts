import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

export default function proxy(req: any) {
  return NextAuth(authConfig).auth(req as any);
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
