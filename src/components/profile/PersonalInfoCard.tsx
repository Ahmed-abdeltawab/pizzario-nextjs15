"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CheckIcon, Edit2Icon, UserIcon, CameraIcon } from "lucide-react";
import { Translation } from "@/types/translations";
import { useActionState, useEffect, useRef } from "react";
import { updateUserProfile } from "@/app/actions/profile";
import { FormInputField } from "./FormInputField";
import {
  UpdateProfileFormValues,
  updateProfileSchema,
} from "@/validation/auth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";

interface PersonalInfoCardProps {
  dict: Translation;
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    phone?: string | null;
    streetAddress?: string | null;
    postalCode?: string | null;
    city?: string | null;
    country?: string | null;
  };
}

const initialState = {
  success: false,
  message: "",
  errors: null,
};

/**
 * Creates form default values from user data
 */
const getFormDefaults = (userData: PersonalInfoCardProps["user"]) => ({
  name: userData.name || "",
  email: userData.email || "",
  phone: userData.phone || "",
  streetAddress: userData.streetAddress || "",
  postalCode: userData.postalCode || "",
  city: userData.city || "",
  country: userData.country || "",
});

export function PersonalInfoCard({ dict, user }: PersonalInfoCardProps) {
  const [state, formAction, isPending] = useActionState(
    updateUserProfile,
    initialState
  );
  const { update: updateSession, data: session } = useSession();
  const hasUpdatedSession = useRef(false);

  const {
    register,
    formState: { errors },
    setError,
    clearErrors,
    reset,
  } = useForm<UpdateProfileFormValues>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: getFormDefaults(user),
  });

  // ✅ Handle server-side validation errors
  useEffect(() => {
    if (state.errors && Object.keys(state.errors).length > 0) {
      Object.entries(state.errors).forEach(([key, messages]) => {
        const errorMessage = Array.isArray(messages)
          ? messages.join(", ")
          : messages;

        setError(key as keyof UpdateProfileFormValues, {
          type: "server",
          message: errorMessage,
        });
      });
    }
  }, [state.errors, setError]);

  // ✅ Handle session update and clear errors on success
  useEffect(() => {
    if (state.success && !hasUpdatedSession.current) {
      // Clear all errors when successful
      clearErrors();

      hasUpdatedSession.current = true;
      updateSession();
    }
  }, [state.success, updateSession, clearErrors]);

  useEffect(() => {
    // Reset form with updated session data after session refresh
    if (session?.user && state.success) {
      reset(getFormDefaults(session.user));
    }
  }, [session?.user, state.success, reset]);
  return (
    <Card className="backdrop-blur-[1em] bg-card/80 border-border/50 shadow-lg">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-[1.5rem] font-bold flex items-center">
            <UserIcon className="w-[1.5em] h-[1.5em] mr-[0.5em] rtl:mr-0 rtl:ml-[0.5em] text-primary" />
            {dict.auth.profile.personalInfo}
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            className="text-primary hover:text-primary/80"
          >
            <Edit2Icon className="w-4 h-4 mr-2 rtl:mr-0 rtl:ml-2" />
            {dict.common.edit}
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-[1.5em]">
        {/* Profile Image Section */}
        <div className="flex flex-col items-center pb-[1.5em] border-b border-border/50">
          <div className="relative group">
            {/* Avatar */}
            <Avatar className="w-[8em] h-[8em] border-[0.25em] border-primary/20 shadow-lg ring-[0.25em] ring-primary/10">
              <AvatarImage
                src={user.image || ""}
                alt={user.name || "Profile"}
                className="object-cover"
              />
              <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/10 text-[2.5em] font-bold text-primary">
                {user.name?.charAt(0).toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>

            {/* Edit Photo Button Overlay */}
            <button
              type="button"
              className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
              aria-label="Change profile photo"
            >
              <div className="text-center">
                <CameraIcon className="w-[2em] h-[2em] text-white mx-auto mb-[0.25em]" />
                <span className="text-[0.75em] text-white font-medium">
                  Change Photo
                </span>
              </div>
            </button>
          </div>

          {/* User Name and Email */}
          <div className="mt-[1em] text-center">
            <h3 className="text-[1.25em] font-bold text-foreground">
              {user.name || "User Name"}
            </h3>
            <p className="text-[0.875em] text-muted-foreground mt-[0.25em]">
              {user.email || "user@example.com"}
            </p>
          </div>
        </div>

        {/* Form Section */}
        <form
          action={formAction}
          className="grid grid-cols-1 md:grid-cols-2 gap-[1.25em]"
        >
          <FormInputField
            label={dict.auth.fullName}
            error={errors.name?.message}
            required
            {...register("name")}
          />

          <FormInputField
            label={dict.auth.email}
            error={errors.email?.message}
            required
            readOnly
            {...register("email")}
          />

          <FormInputField
            label={dict.auth.phone}
            error={errors.phone?.message}
            {...register("phone")}
            type="tel"
          />

          <FormInputField
            label={dict.auth.city}
            error={errors.city?.message}
            required
            {...register("city")}
          />

          <FormInputField
            label={dict.auth.streetAddress}
            error={errors.streetAddress?.message}
            required
            {...register("streetAddress")}
            className="md:col-span-2"
          />

          <FormInputField
            label={dict.auth.postalCode}
            error={errors.postalCode?.message}
            required
            {...register("postalCode")}
            className="md:col-span-2"
          />

          <FormInputField
            label={dict.auth.country}
            error={errors.country?.message}
            required
            {...register("country")}
            className="md:col-span-2"
          />

          <div className="md:col-span-2 pt-[1em]">
            <Button
              type="submit"
              className="w-full h-[3em] text-[1em] font-semibold bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isPending} // Disable button while pending
            >
              <CheckIcon
                className={`w-[1.25em] h-[1.25em] mr-[0.5em] rtl:mr-0 rtl:ml-[0.5em] ${
                  isPending ? "animate-spin" : ""
                }`}
              />
              {isPending ? "Saving..." : dict.common.save || "Save Changes"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
