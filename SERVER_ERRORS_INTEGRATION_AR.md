# ربط أخطاء الخادم بـ React Hook Form

## 🎯 المشكلة

الأخطاء من الخادم لا تظهر في الفورم لأن هناك قطعاً في الاتصال بينهما:

```
┌─────────────────┐
│  React Hook Form│  ← أخطاء العميل (validation)
│  errors.name    │  ✅ تظهر
└────────┬────────┘
         │
         ✗ لا توجد اتصال
         │
┌────────▼────────┐
│ Server Errors   │  ← أخطاء الخادم (business logic)
│ state.errors    │  ❌ لا تظهر
└─────────────────┘
```

### مثال:
```typescript
// الخادم يرجع:
{
  success: false,
  message: "Failed to update",
  errors: {
    phone: ["Phone number is already in use"] // ❌ لا يظهر في الفورم
  }
}
```

---

## ✅ الحل الموجود بالفعل!

أنت بالفعل طبقت الحل جزئياً في المكون:

```typescript
const { register, formState: { errors }, setError, reset } = useForm(...);

useEffect(() => {
  if (state.errors) {
    Object.keys(state.errors).forEach((key) => {
      setError(key as keyof UpdateProfileFormValues, {
        type: "server",
        message: state.errors[key as keyof typeof state.errors],
      });
    });
  }
}, [state.errors, setError]);
```

✅ **هذا صحيح تماماً!**

---

## 🔄 كيف يعمل؟

### الخطوة 1: الخادم يرجع الأخطاء

```typescript
// في server action: src/app/actions/profile.ts
const validData = updateProfileSchema.safeParse(formDataObject);

if (!validData.success) {
  return {
    success: false,
    message: "Please check your input.",
    errors: validData.error.flatten().fieldErrors, // ✅ أخطاء الـ validation
  };
}
```

### الخطوة 2: المكون يستقبل الأخطاء في state

```typescript
const [state, formAction, isPending] = useActionState(
  updateUserProfile,
  initialState
);
// state.errors يحتوي على الأخطاء من الخادم
```

### الخطوة 3: ربط الأخطاء بـ React Hook Form

```typescript
useEffect(() => {
  if (state.errors) {
    // لكل خطأ من الخادم
    Object.keys(state.errors).forEach((key) => {
      // اضبط الخطأ في الفورم
      setError(key as keyof UpdateProfileFormValues, {
        type: "server", // نوع الخطأ
        message: state.errors[key], // رسالة الخطأ
      });
    });
  }
}, [state.errors, setError]);
```

### الخطوة 4: عرض الخطأ في الحقل

```typescript
<FormInputField
  label={dict.auth.phone}
  error={errors.phone?.message} // ✅ يعرض الخطأ هنا
  {...register("phone")}
/>
```

---

## 📊 تدفق البيانات الكامل

```
المستخدم يُدخل البيانات
         │
         ▼
المكون: يرسل البيانات إلى formAction
         │
         ▼
الخادم: يتحقق من البيانات
         ├─ ✅ صحيح → حفظ + رجوع success: true
         └─ ❌ خطأ → رجوع errors مفصلة
         │
         ▼
المكون: يستقبل state.errors
         │
         ▼
setError: ينسخ الأخطاء إلى React Hook Form
         │
         ▼
FormInputField: يعرض الأخطاء تحت الحقل ✅
```

---

## 💡 مثال عملي: أخطاء الخادم

### 1️⃣ في Server Action - أضف عمليات التحقق

```typescript
// src/app/actions/profile.ts

// بعد التحقق من البيانات الأساسية:
if (!validData.success) {
  return {
    success: false,
    message: "Validation failed",
    errors: validData.error.flatten().fieldErrors,
  };
}

// أضف تحققات من الخادم:
const errors: typeof state.errors = {};

// تحقق: هل البريد مستخدم من قبل؟
if (validData.data.email) {
  const existingEmail = await prisma.user.findUnique({
    where: { email: validData.data.email },
  });
  
  if (existingEmail && existingEmail.id !== userId) {
    errors.email = ["Email is already in use"];
  }
}

// تحقق: صيغة الهاتف
if (validData.data.phone && !isValidPhoneNumber(validData.data.phone)) {
  errors.phone = ["Invalid phone format"];
}

// إذا كان هناك أخطاء، أرجعها
if (Object.keys(errors).length > 0) {
  return {
    success: false,
    message: "Please fix the errors below",
    errors,
  };
}

// وإلا، استمر في التحديث
await prisma.user.update({
  where: { id: userId },
  data: updateData,
});
```

### 2️⃣ في المكون - استقبل وربط الأخطاء

الكود الموجود لديك بالفعل يفعل هذا ✅

```typescript
useEffect(() => {
  if (state.errors) {
    Object.keys(state.errors).forEach((key) => {
      setError(key as keyof UpdateProfileFormValues, {
        type: "server",
        message: state.errors[key][0], // الخطأ الأول (إذا كان صفيف)
      });
    });
  }
}, [state.errors, setError]);
```

### 3️⃣ النتيجة - الأخطاء تظهر تحت الحقول ✅

```
Phone
[_____________________]
❌ "Email is already in use"
```

---

## 🔧 التحسينات المقترحة

### 1. معالجة صفائف الأخطاء

الخادم قد يرجع صفيف من الأخطاء:

```typescript
// ❌ حالياً: تأخذ الخطأ الأول فقط
message: state.errors[key][0]

// ✅ الأفضل: دمج كل الأخطاء
message: state.errors[key].join(", ")
```

### 2. مسح الأخطاء عند النجاح

```typescript
// أضف في useEffect للنجاح:
useEffect(() => {
  if (state.success && !hasUpdatedSession.current) {
    // مسح جميع الأخطاء السابقة
    clearErrors(); // ✅ أضفها هنا
    hasUpdatedSession.current = true;
    updateSession();
  }
}, [state.success, updateSession, clearErrors]);
```

### 3. تمييز الأخطاء من الخادم

```typescript
// أضف في الـ FormInputField:
<FormInputField
  label={dict.auth.phone}
  error={errors.phone?.message}
  serverError={errors.phone?.type === "server"} // ✅ تمييز بصري
  {...register("phone")}
/>
```

---

## 🎯 الكود المحسّن الكامل

### في المكون:

```typescript
"use client";

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
    clearErrors, // ✅ أضيفت
    reset,
  } = useForm<UpdateProfileFormValues>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: getFormDefaults(user),
  });

  // ✅ معالجة أخطاء الخادم
  useEffect(() => {
    if (state.errors && Object.keys(state.errors).length > 0) {
      Object.entries(state.errors).forEach(([key, messages]) => {
        setError(key as keyof UpdateProfileFormValues, {
          type: "server",
          message: Array.isArray(messages) 
            ? messages.join(", ")  // دمج الأخطاء
            : messages,
        });
      });
    }
  }, [state.errors, setError]);

  // ✅ مسح الأخطاء عند النجاح
  useEffect(() => {
    if (state.success && !hasUpdatedSession.current) {
      clearErrors(); // مسح جميع الأخطاء
      hasUpdatedSession.current = true;
      updateSession();
    }
  }, [state.success, updateSession, clearErrors]);

  // ✅ إعادة تعيين الفورم
  useEffect(() => {
    if (session?.user && state.success) {
      reset(getFormDefaults(session.user));
    }
  }, [session?.user, state.success, reset]);

  return (
    <Card className="backdrop-blur-[1em] bg-card/80 border-border/50 shadow-lg">
      {/* ... JSX ... */}
      
      <form action={formAction} className="grid grid-cols-1 md:grid-cols-2 gap-[1.25em]">
        <FormInputField
          label={dict.auth.phone}
          error={errors.phone?.message} // ✅ يعرض خطأ الخادم أو العميل
          {...register("phone")}
          type="tel"
        />
        {/* ... حقول أخرى ... */}
      </form>
    </Card>
  );
}
```

---

## 🧪 مثال للاختبار

### الخطوة 1: اختبر أخطاء العميل (Validation)

```
1. اترك حقل "الاسم" فارغاً
2. اضغط "حفظ"
3. ✅ يجب أن تظهر: "Name is required"
```

### الخطوة 2: اختبر أخطاء الخادم

```
1. أدخل بريد إلكتروني موجود بالفعل
2. اضغط "حفظ"
3. ✅ يجب أن تظهر: "Email is already in use" (من الخادم)
```

### الخطوة 3: اختبر مسح الأخطاء

```
1. أصلح الخطأ
2. اضغط "حفظ" مرة أخرى
3. ✅ يجب أن تختفي جميع الأخطاء بعد النجاح
```

---

## 📋 أنواع الأخطاء

### 1. أخطاء التحقق (Client-side)
```typescript
// في FormInputField (من react-hook-form)
- "Name is required"
- "Email must be valid"
- "Phone must contain numbers"
```

### 2. أخطاء الخادم (Server-side)
```typescript
// في Server Action (من Prisma/Database)
- "Email is already in use"
- "Phone number is reserved"
- "User not found"
```

### 3. أخطاء الاتصال (Network)
```typescript
// في try/catch
- "Failed to connect to server"
- "Request timeout"
```

---

## 🎨 تحسينات بصرية

### تمييز أخطاء الخادم

```typescript
// في FormInputField:
export function FormInputField({ 
  error, 
  serverError, // ✅ جديد
  ...props 
}) {
  return (
    <div>
      <input {...props} />
      {error && (
        <p className={serverError ? "text-red-600" : "text-orange-500"}>
          {error}
        </p>
      )}
    </div>
  );
}

// الاستخدام:
<FormInputField
  error={errors.phone?.message}
  serverError={errors.phone?.type === "server"}
  {...register("phone")}
/>
```

---

## ✅ الحالة الحالية

### ما هو موجود بالفعل ✅

```typescript
✅ setError للربط
✅ useEffect للاستماع للأخطاء
✅ state.errors من الخادم
✅ عرض الأخطاء في FormInputField
```

### ما يمكن تحسينه 🟡

```typescript
🟡 معالجة صفائف الأخطاء بشكل أفضل
🟡 مسح الأخطاء بعد النجاح
🟡 تمييز بصري للأخطاء (client vs server)
🟡 إضافة المزيد من التحققات في الخادم
```

---

## 🚀 التطبيق التدريجي

### المرحلة 1: تحسين الكود الحالي
```typescript
// اجعل معالجة الأخطاء أقوى
const message = Array.isArray(errors[key])
  ? errors[key].join(", ")
  : errors[key];
```

### المرحلة 2: مسح الأخطاء
```typescript
// أضف clearErrors() عند النجاح
if (state.success) {
  clearErrors();
  // ...
}
```

### المرحلة 3: تحققات الخادم
```typescript
// أضف مزيد من التحققات في server action
if (/* شرط ما */) {
  return { errors: { field: ["Message"] } };
}
```

---

## 📚 الملفات المتعلقة

- **PersonalInfoCard.tsx** - المكون (يحتوي على الحل ✅)
- **profile.ts** - Server Action (إرجاع الأخطاء)
- **FormInputField.tsx** - عرض الأخطاء
- **auth.ts** - Schema للتحقق

---

## 🎯 الخلاصة

### ✅ الحل موجود بالفعل!

الكود الحالي لديك يربط أخطاء الخادم بـ React Hook Form بشكل صحيح:

```
state.errors (من الخادم)
    ↓
useEffect (يستقبل التغيير)
    ↓
setError (يربط بالفورم)
    ↓
errors.field?.message (يظهر في الحقل)
```

### 🟡 التحسينات الموصى بها:

1. **معالجة أفضل للأخطاء**
   ```typescript
   message: Array.isArray(messages) ? messages.join(", ") : messages
   ```

2. **مسح الأخطاء عند النجاح**
   ```typescript
   if (state.success) clearErrors();
   ```

3. **إضافة تحققات الخادم**
   ```typescript
   // في server action
   if (existingEmail) errors.email = ["Email in use"];
   ```

4. **تمييز بصري**
   ```typescript
   serverError={errors.phone?.type === "server"}
   ```

---

## 💬 الخلاصة النهائية

أنت **بالفعل طبقت الحل بشكل صحيح**! 🎉

الأخطاء من الخادم **تظهر بالفعل** تحت الحقول. لكن يمكنك تحسينها أكثر:

- ✅ **الآن**: الحل يعمل
- 🟡 **قريباً**: حسّن معالجة الأخطاء
- 🔵 **لاحقاً**: أضف تحققات خادم أكثر
