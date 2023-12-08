import NextAuth from "next-auth";
import type { NextAuthConfig } from "next-auth";
import GitHub from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/prisma";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  debug: process.env.NODE_ENV === "development",
  adapter: PrismaAdapter(prisma),
  providers: [GitHub],
  callbacks: {
    session: async ({ session, user }) => {
      if (session.user) {
        session.user.admin = user.admin;
      }
      return Promise.resolve(session);
    },
  },
} satisfies NextAuthConfig);
