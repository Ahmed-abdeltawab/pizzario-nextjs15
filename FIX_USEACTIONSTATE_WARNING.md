# Fix: useActionState vs useTransition

## Issue
When using `useActionState` with `react-hook-form`'s `handleSubmit`, React throws a warning:

```
An async function with useActionState was called outside of a transition. 
This is likely not what you intended (for example, isPending will not update correctly). 
Either call the returned function inside startTransition, or pass it to an `action` or `formAction` prop.
```

## Root Cause

`useActionState` is designed to work with form's `action` or `formAction` props, not to be called programmatically. When you call the action function returned by `useActionState` inside a regular function (like `onSubmit`), it's not wrapped in a transition, causing the warning.

## Solution

Use `useTransition` instead when combining with `react-hook-form`, since we're calling the server action programmatically in the `onSubmit` handler.

### Before (Incorrect)
```typescript
const [state, formAction, isPending] = useActionState(updateUserProfile, null);

const onSubmit = async (data: UpdateProfileFormValues) => {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    if (value) formData.append(key, value);
  });
  formAction(formData); // ❌ Called outside transition
};

<form onSubmit={handleSubmit(onSubmit)}>
```

### After (Correct)
```typescript
const [isPending, startTransition] = useTransition();
const [state, setState] = useState<{ success: boolean; message: string; errors?: any } | null>(null);

const onSubmit = async (data: UpdateProfileFormValues) => {
  startTransition(async () => { // ✅ Wrapped in transition
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value) formData.append(key, value);
    });
    
    const result = await updateUserProfile(null, formData);
    setState(result); // ✅ Manually set state
  });
};

<form onSubmit={handleSubmit(onSubmit)}>
```

## When to Use Each

### Use `useActionState` when:
- Form uses native `action` or `formAction` prop
- No client-side validation before submission
- Progressive enhancement is important
- Simple form without react-hook-form

**Example:**
```typescript
const [state, formAction] = useActionState(myAction, null);

<form action={formAction}>
  <input name="field" />
  <button type="submit">Submit</button>
</form>
```

### Use `useTransition` when:
- Calling server action programmatically
- Using with react-hook-form or similar libraries
- Need client-side validation first
- Custom submit logic required

**Example:**
```typescript
const [isPending, startTransition] = useTransition();

const onSubmit = (data) => {
  startTransition(async () => {
    const result = await myAction(data);
    // Handle result
  });
};

<form onSubmit={handleSubmit(onSubmit)}>
```

## Benefits of Our Implementation

✅ **No React Warnings** - Properly wrapped in transition
✅ **Client Validation** - react-hook-form validates before submission
✅ **Server Validation** - Server action provides security layer
✅ **Loading States** - `isPending` updates correctly
✅ **Session Refresh** - Still triggers session update on success
✅ **Type Safety** - Full TypeScript support

## Complete Flow

```
1. User fills form
   ↓
2. Client validation (react-hook-form)
   ↓
3. onSubmit called if valid
   ↓
4. startTransition wraps async action
   ↓
5. Server action executes
   ↓
6. setState updates with result
   ↓
7. useEffect detects success
   ↓
8. Session refreshes via update()
   ↓
9. UI updates with fresh data
```

## Testing

The fix maintains all functionality:
- ✅ Client-side validation still works
- ✅ Server-side validation still works
- ✅ Session refresh still works
- ✅ Loading states (isPending) work correctly
- ✅ No React warnings in console
- ✅ All TypeScript types correct

## Files Modified

- `src/components/profile/PersonalInfoCard.tsx`
  - Changed from `useActionState` to `useTransition`
  - Added `useState` for managing action result
  - Wrapped server action call in `startTransition`
  - All other functionality remains the same

## Related Documentation

- [React useTransition](https://react.dev/reference/react/useTransition)
- [React useActionState](https://react.dev/reference/react/useActionState)
- [Next.js Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations)
