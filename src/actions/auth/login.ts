"use server";

import { AuthError } from "next-auth";

import { signIn } from "@/lib/auth";
import {
  loginSchema,
  type LoginInput,
} from "@/validations/auth";

export type LoginActionResult =
  | {
      success: true;
      message: string;
    }
  | {
      success: false;
      message: string;
      errors?: Record<string, string[]>;
    };

export async function loginUser(
  input: LoginInput & {
    callbackUrl?: string;
  }
): Promise<LoginActionResult> {
  try {
    const validatedFields = loginSchema.safeParse(input);

    if (!validatedFields.success) {
      return {
        success: false,
        message: "Validation failed",
        errors: validatedFields.error.flatten().fieldErrors,
      };
    }

    const {
      email,
      password,
    } = validatedFields.data;

    await signIn("credentials", {
      email,
      password,
      redirect: false,
      redirectTo:
        input.callbackUrl || "/",
    });

    return {
      success: true,
      message: "Login successful",
    };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            success: false,
            message: "Invalid email or password",
          };

        default:
          return {
            success: false,
            message: "Authentication failed",
          };
      }
    }

    console.error("Login Error:", error);

    return {
      success: false,
      message: "Something went wrong during login",
    };
  }
}