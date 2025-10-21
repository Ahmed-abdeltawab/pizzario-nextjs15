# Session Refresh Implementation

## Problem
After updating user profile data, the changes were saved to the database successfully, but the session data remained stale (old values) until the user logged out and logged back in.

## Root Cause
NextAuth with JWT strategy stores session data in an encrypted cookie token. When database changes occur, the JWT token doesn't automatically update - it requires an explicit refresh trigger.

## Solution Architecture

### 1. **Server Action** (`src/app/actions/auth.ts`)
```typescript
export async function updateUserProfile(
  prevState: FormState | null,
  formData: FormData
): Promise<FormState>
```

**What it does:**
- Gets userId from session (`getServerSession(authOptions)`)
- Validates form data with Zod schema
- Updates database with new values
- Revalidates the profile page path
- Returns success/error state

**Key Points:**
- Only updates fields that have values (partial updates supported)
- Empty strings are converted to `null` in database
- Returns `{ success: true, message, errors }` on success

### 2. **JWT Callback** (`src/server/auth.ts`)
```typescript
async jwt({ token, user, trigger }) {
  // Initial sign in
  if (user) {
    // Fetch all user data from database
  }
  
  // Refresh on update trigger
  if (trigger === "update" && token.id) {
    const dbUser = await prisma.user.findUnique({
      where: { id: token.id as string },
    });
    // Update token with fresh data
  }
  
  return token;
}
```

**What it does:**
- On initial sign-in: Fetches all user data from database and stores in JWT
- On update trigger: Re-fetches user data from database and refreshes JWT
- Stores all fields including: id, name, email, role, image, phone, streetAddress, postalCode, city, country, createdAt, updatedAt

**Key Points:**
- `trigger === "update"` is called when `useSession().update()` is invoked
- Dates are converted to ISO strings for JWT compatibility
- All fields are refreshed, ensuring session has latest database state

### 3. **Session Callback** (`src/server/auth.ts`)
```typescript
async session({ session, token }) {
  // Transfer all data from JWT token to session object
  if (session.user && token) {
    session.user.id = token.id;
    session.user.name = token.name;
    // ... all other fields
  }
  return session;
}
```

**What it does:**
- Maps all data from JWT token to the session object
- This session object is what `getServerSession()` and `useSession()` return

### 4. **Client Component** (`src/components/profile/PersonalInfoCard.tsx`)
```typescript
export function PersonalInfoCard({ dict, user }: PersonalInfoCardProps) {
  const { update } = useSession();
  const [state, formAction, isPending] = useActionState(updateUserProfile, null);
  
  // React Hook Form setup
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: { ...user }
  });

  // Handle server action response
  useEffect(() => {
    if (state?.success) {
      console.log("✅ Profile updated successfully");
      // Trigger session refresh
      update().then(() => {
        console.log("✅ Session refreshed with new data");
      });
    } else if (state?.message) {
      console.error("❌ Profile update failed:", state.message);
    }
  }, [state, update]);

  // Submit handler
  const onSubmit = async (data: UpdateProfileFormValues) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value) formData.append(key, value);
    });
    formAction(formData);
  };
}
```

**What it does:**
- Uses `useSession()` to get the `update()` function
- Uses `useActionState()` to handle server action with loading state
- Uses `react-hook-form` for client-side validation
- When server action succeeds (`state.success === true`):
  1. Logs success message
  2. Calls `update()` to trigger JWT refresh
  3. This invokes the JWT callback with `trigger="update"`
  4. Fresh data is fetched from database and stored in new JWT
  5. Session automatically updates with new data

**Key Points:**
- Client-side validation happens before server submission (UX improvement)
- Server-side validation provides security layer
- `update()` is async and returns a Promise
- No page reload needed - session updates automatically

## Complete Data Flow

```
User submits form
    ↓
react-hook-form validates (client-side)
    ↓
formAction(formData) called
    ↓
updateUserProfile server action executes
    ↓
Database updated with new values
    ↓
Returns { success: true, message, errors: null }
    ↓
useEffect detects state.success === true
    ↓
Calls update() from useSession()
    ↓
JWT callback triggered with trigger="update"
    ↓
Fetches fresh data from database
    ↓
Updates JWT token with new values
    ↓
Session callback maps JWT to session
    ↓
useSession() returns updated session data
    ↓
UI automatically re-renders with fresh data
```

## Testing the Implementation

### 1. Start Development Server
```bash
npm run dev
```

### 2. Navigate to Profile Page
- Log in to your account
- Go to `/profile` page

### 3. Open Browser Console
- Press F12 to open DevTools
- Go to Console tab

### 4. Update Profile
- Change any field (name, phone, address, etc.)
- Click "Save Changes"

### 5. Expected Console Output
```
📝 Submitting profile update: { name: "New Name", email: "...", ... }
✅ Profile updated successfully: Profile updated successfully!
✅ Session refreshed with new data
```

### 6. Verify Session Data
- Check `session.user.name` in the UI
- Should immediately show the new value WITHOUT page reload
- ProfileSummary component should display updated data

### 7. Server-Side Verification
In terminal running dev server:
```
userId: [your-user-id]
formDataObject: { name: "New Name", ... }
updateData: { name: "New Name" }
```

## Troubleshooting

### Session not updating after save
**Symptom:** Database updates but UI shows old data

**Solution:**
1. Check browser console for errors
2. Verify `update()` is being called in useEffect
3. Check that JWT callback has `trigger === "update"` condition
4. Ensure `authOptions` is imported correctly in component

### Form validation errors
**Symptom:** Form won't submit or shows validation errors

**Solution:**
1. Check Zod schema in `src/validation/auth.ts`
2. All fields are optional except name and email
3. Empty strings are valid (converted to null)
4. Check console for specific validation errors

### "User not authenticated" error
**Symptom:** Server action returns authentication error

**Solution:**
1. Ensure user is logged in
2. Check session cookie exists (DevTools → Application → Cookies)
3. Verify `getServerSession(authOptions)` returns valid session
4. Check NextAuth secret is set in `.env`

## Benefits of This Implementation

✅ **Immediate UI Updates:** No page reload required
✅ **Data Consistency:** Session always matches database
✅ **Security:** JWT strategy with encrypted cookies
✅ **Performance:** Only refreshes on actual updates
✅ **Partial Updates:** Can update one field or all fields
✅ **Validation:** Client + server validation for best UX and security
✅ **Type Safety:** Full TypeScript support with proper types
✅ **Developer Experience:** Clear console logging for debugging

## Files Modified

1. `src/server/auth.ts` - Added update trigger support in JWT callback
2. `src/app/actions/auth.ts` - Server action for profile updates
3. `src/components/profile/PersonalInfoCard.tsx` - Client component with session refresh
4. `src/types/next-auth.d.ts` - Extended types for all user fields
5. `src/validation/auth.ts` - Zod schemas for validation

## Future Enhancements

- [ ] Add toast notifications (install shadcn/ui toast component)
- [ ] Add optimistic UI updates (show changes before server confirms)
- [ ] Add form reset after successful update
- [ ] Add confirmation dialog for important changes
- [ ] Add change history/audit log
- [ ] Add profile picture upload with image optimization
