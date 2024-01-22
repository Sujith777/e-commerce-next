"use server";

import { prisma } from "@/lib/db/prisma";

export async function getUserByEmail(email: string) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      throw Error("User does not exist");
    }
    return user;
  } catch (error) {
    return null;
  }
}

export async function getUserById(id: string) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });
    if (!user) {
      throw Error("User does not exist");
    }
    return user;
  } catch (error) {
    return null;
  }
}
