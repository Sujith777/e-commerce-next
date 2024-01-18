import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import google from "next-auth/providers/google";
import { prisma } from "./lib/db/prisma";
import { PrismaClient } from "@prisma/client";

export const {
  handlers: { GET, POST },
  auth,
} = NextAuth({
  providers: [google],
});
