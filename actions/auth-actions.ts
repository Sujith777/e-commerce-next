"use server";

import { z } from "zod";
import bcrypt from "bcryptjs";
import { signIn } from "@/auth";
import { LoginSchema, RegisterSchema } from "@/lib/db/validation";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import { getUserByEmail } from "./user-actions";
import { prisma } from "@/lib/db/prisma";
import { generateVerificationToken } from "@/lib/tokens";

export async function login(values: z.infer<typeof LoginSchema>) {
  const validatedFields = LoginSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }
  const { email, password } = validatedFields.data;

  // This can be used to prevent users without email verification from logging in
  // const existingUser = await getUserByEmail(email);
  // if (!existingUser || !existingUser.email || !existingUser.password) {
  //   return { error: "Email does not exist" };
  // }

  // if (!existingUser.emailVerified) {
  //   const verificationToken = await generateVerificationToken(
  //     existingUser.email
  //   );
  //   return { success: "Confirmation Email sent" };
  // }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials" };
        default:
          return { error: "Something went wrong" };
      }
    }
    throw error;
  }
  return { success: "Login successful" };
}

export async function register(values: z.infer<typeof RegisterSchema>) {
  const validatedFields = RegisterSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid credentials" };
  }

  const { email, password, name } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);
  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    return { error: "Email already in use" };
  }

  await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  return { success: "User Registration successful" };
}
