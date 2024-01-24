import NextAuth, { Session } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/db/prisma";
import { UserRole } from "@prisma/client";
import authConfig from "@/auth.config";
import { getUserById } from "./actions/user-actions";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  events: {
    async linkAccount({ user }) {
      await prisma.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  },
  callbacks: {
    // This can be used to prevent users without email verification from logging in
    // async signIn({ user, account }) {
    //   if (account?.provider !== "credentials") return true;

    //   const existingUser = await getUserById(user?.id || "");
    //   if (!existingUser || !existingUser?.emailVerified) {
    //     return false;
    //   }
    //   return true;
    // },

    async session({ session, token }: { session: Session; token?: any }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      if (token.role && session.user) {
        session.user.role = token.role as UserRole;
      }
      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;
      const existingUser = await getUserById(token.sub);
      if (!existingUser) return token;
      token.role = existingUser.role;
      return token;
    },
  },
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
});
