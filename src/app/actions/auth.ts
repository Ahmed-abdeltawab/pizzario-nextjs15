// actions/auth.ts
"use server"; // <-- مهم جداً لتعريفها كـ Server Action

import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

// الحالة المبدئية اللي هترجع للفورم
type FormState = {
  success: boolean;
  message: string;
};

export async function registerUser(
  previousState: FormState, // الحالة السابقة للفورم
  formData: FormData // البيانات اللي جاية من الفورم
): Promise<FormState> {
  const fullName = formData.get("fullName") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  console.log("Registering user:",  fullName, email );
  if (!fullName || !email || !password) {
    return { success: false, message: "please fill in all fields." };
  }

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return { success: false, message: "This email is already registered." };
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    await prisma.user.create({
      data: {
        fullName,
        email,
        password: hashedPassword,
      },
    });

    // 5. إرجاع رسالة نجاح
    return {
      success: true,
      message: "تم إنشاء حسابك بنجاح! يمكنك الآن تسجيل الدخول.",
    };
  } catch (error) {
    console.error("REGISTRATION_ERROR:", error);
    return { success: false, message: "حدث خطأ ما، يرجى المحاولة مرة أخرى." };
  }
}
