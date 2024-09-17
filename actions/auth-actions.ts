"use server";

import { createAuthSession, destroySession } from "@/lib/auth";
import { hashUserPassword, verifyPassword } from "@/lib/hash";
import { createUser, getUserByEmail } from "@/lib/user";
import { IUser } from "@/models/user";
import { redirect } from "next/navigation";
export const sigunUp = async (
  prev: { errors: { [key: string]: string } },
  formData: FormData
) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const errors: { [key: string]: string } = {};

  if (!email.includes("@")) {
    errors.email = "Please enter a valid email address.";
  }
  if (password.trim().length < 8) {
    errors.password = "Password must be atleat 8 characters long.";
  }
  if (Object.keys(errors).length) {
    return { errors };
  }

  const hashedPassword = hashUserPassword(password);

  try {
    const userId = createUser(email, hashedPassword);

    await createAuthSession(userId.toString());
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.code === "SQLITE_CONSTRAINT_UNIQUE") {
      return {
        errors: {
          email: "Email already exists.",
        },
      };
    }
    throw error;
  }
  redirect("/training");
};

export const login = async (
  prev: { errors: { [key: string]: string } },
  formData: FormData
) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const existingUser = getUserByEmail(email) as IUser;

  if (!existingUser) {
    return {
      errors: {
        email: "Could not authenticate user.",
      },
    };
  }
  const isValidPassword = verifyPassword(existingUser.password, password);
  if (!isValidPassword) {
    return {
      errors: {
        email: "Could not authenticate user.please check your credentials.",
      },
    };
  }

  await createAuthSession(existingUser.id.toString());
  redirect("/training");
};

export const auth = async (
  mode: string,
  prev: { errors: { [key: string]: string } },
  formData: FormData
) => {
  if (mode === "login") {
    return login(prev, formData);
  }
  return sigunUp(prev, formData);
};

export const logout = async () => {
  await destroySession();
  redirect("/");
};
