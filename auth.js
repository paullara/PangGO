import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Discord from "next-auth/providers/discord";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "./app/lib/prisma.js";

export const { handlers, auth, signIn, signOut } = NextAuth({
  debug: true,

  adapter: PrismaAdapter(prisma),

  providers: [
    Google({
      allowDangerousEmailLinking: true,
    }),
    Discord({
      issuer: "https://discord.com",
      allowDangerousEmailLinking: true,
    }),
  ],

  session: {
    strategy: "database",
  },

  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
        session.user.role = user.role;
      }
      return session;
    },
  },
});
