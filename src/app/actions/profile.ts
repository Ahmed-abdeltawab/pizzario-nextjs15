"use server";

import prisma from "@/lib/prisma";
import { updateProfileSchema } from "@/validation/auth";
import { getServerSession } from "next-auth";
import { authOptions } from "@/server/auth";
import { revalidatePath } from "next/cache";
import { Routes } from "@/constants/enums";
import { getCurrentLocale } from "@/lib/getCurrentLocale";
type FormState = {
  success: boolean;
  message: string;
  errors?: {
    name?: string[];
    email?: string[];
    phone?: string[];
    streetAddress?: string[];
    postalCode?: string[];
    city?: string[];
    country?: string[];
  } | null;
};
export async function updateUserProfile(
  prevState: FormState | null,
  formData: FormData
): Promise<FormState> {
  // Get user session
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;
  console.log("userId:", userId);
  if (!userId) {
    return { success: false, message: "User not authenticated.", errors: null };
  }
  const currentLocale = await getCurrentLocale();
  try {
    // Extract and validate form data
    const formDataObject = Object.fromEntries(formData.entries());
    console.log("formDataObject:", formDataObject);
    const validData = updateProfileSchema.safeParse(formDataObject);

    if (!validData.success) {
      return {
        success: false,
        message: "Please check your input and try again.",
        errors: validData.error.flatten().fieldErrors,
      };
    }

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!existingUser) {
      return {
        success: false,
        message: "User not found.",
        errors: null,
      };
    }

    // Build update data object - only include fields that have values
    const updateData: {
      name?: string;
      email?: string;
      phone?: string | null;
      streetAddress?: string | null;
      postalCode?: string | null;
      city?: string | null;
      country?: string | null;
    } = {};

    if (validData.data.name && validData.data.name !== "") {
      updateData.name = validData.data.name;
    }
    if (validData.data.email && validData.data.email !== "") {
      updateData.email = validData.data.email;
    }
    if (validData.data.phone !== undefined) {
      updateData.phone =
        validData.data.phone === "" ? null : validData.data.phone;
    }
    if (validData.data.streetAddress !== undefined) {
      updateData.streetAddress =
        validData.data.streetAddress === ""
          ? null
          : validData.data.streetAddress;
    }
    if (validData.data.postalCode !== undefined) {
      updateData.postalCode =
        validData.data.postalCode === "" ? null : validData.data.postalCode;
    }
    if (validData.data.city !== undefined) {
      updateData.city = validData.data.city === "" ? null : validData.data.city;
    }
    if (validData.data.country !== undefined) {
      updateData.country =
        validData.data.country === "" ? null : validData.data.country;
    }

    // Only update if there's data to update
    if (Object.keys(updateData).length === 0) {
      return {
        success: false,
        message: "No changes to update.",
        errors: null,
      };
    }
    console.log("updateData:", updateData);
    // Update user profile with only the fields that have values
    await prisma.user.update({
      where: { id: userId },
      data: updateData,
    });
   
    // Revalidate the profile page to show updated data
    revalidatePath(`/${currentLocale}/${Routes.PROFILE}`);
    
    return {
      success: true,
      message: "Profile updated successfully!",
      errors: null,
    };
  } catch (error) {
    console.error("UPDATE_PROFILE_ERROR:", error);
    return {
      success: false,
      message: "Failed to update profile. Please try again.",
      errors: null,
    };
  }
}
