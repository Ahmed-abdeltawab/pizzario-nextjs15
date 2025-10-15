"use server";

import prisma from "@/lib/prisma";
import { registerSchema } from "@/validation/auth";
import bcrypt from "bcryptjs";
import { z } from "zod";

// Validation schema for user registration


export async function registerUser(
  prevState: { success: boolean; message: string },
  formData: FormData
) {
  try {
    // Extract form data with type safety
    const fullName = formData.get("fullName");
    const email = formData.get("email");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");

    // Ensure all fields are strings
    if (
      typeof fullName !== "string" ||
      typeof email !== "string" ||
      typeof password !== "string" ||
      typeof confirmPassword !== "string"
    ) {
      return {
        success: false,
        message: "Invalid form data.",
      };
    }

    const rawData = {
      fullName,
      email,
      password,
      confirmPassword,
    };

    // Validate input
    const validationResult = registerSchema.safeParse(rawData);

    if (!validationResult.success) {
      // Return the first validation error
      return {
        success: false,
        message: validationResult.error.issues[0].message,
      };
    }

    // Data is already validated and available in rawData
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return {
        success: false,
        message: "Email already in use.",
      };
    }

    // Hash password and create user
    const hashedPassword = await bcrypt.hash(password, 12);

    await prisma.user.create({
      data: {
        name: fullName,
        email,
        password: hashedPassword,
      },
    });

    return {
      success: true,
      message: "Account created successfully! Redirecting...",
    };
  } catch (error) {
    console.error("REGISTER_ERROR:", error);
    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }
}
