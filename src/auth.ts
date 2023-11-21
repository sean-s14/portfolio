import NextAuth from "next-auth";
import type { NextAuthConfig } from "next-auth";
import GitHub from "next-auth/providers/github";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  providers: [GitHub],
} satisfies NextAuthConfig);
