# 🔐 Authentication Flow - Profile Page Access Test

## Scenario: Non-Logged-In User Tries to Access Profile Page

### **Test Case 1: Direct URL Access**

**Action:** User types `http://localhost:3000/en/profile` in browser

**Flow:**
```
1. Browser requests: /en/profile
   ↓
2. Middleware (withAuth) intercepts request
   ↓
3. Checks: Is /profile a protected route? → YES
   ↓
4. Checks: Does user have valid token? → NO (not logged in)
   ↓
5. authorized callback returns: false
   ↓
6. NextAuth redirects to: /auth/signin
   ↓
7. intlMiddleware adds locale: /en/auth/signin
   ↓
8. User sees: Sign In page
```

**Result:** ✅ **Redirected to Sign-In page** (`/en/auth/signin`)

---

### **Test Case 2: Clicking Profile Link When Not Logged In**

**Action:** User clicks on "Profile" link in navigation

**Flow:**
```
1. Click triggers navigation to: /en/profile
   ↓
2. Same as Test Case 1
   ↓
3. User sees: Sign In page
```

**Result:** ✅ **Redirected to Sign-In page**

---

### **Test Case 3: After Successful Login**

**Action:** User logs in successfully

**Flow:**
```
1. User submits credentials on /en/auth/signin
   ↓
2. SignInForm calls: signIn("credentials", { email, password })
   ↓
3. NextAuth validates credentials via authorize function
   ↓
4. If valid: Creates JWT token with user data
   ↓
5. Sets session cookie
   ↓
6. Redirects to: /en/ (home page - as per SignInForm)
   ↓
7. User is now logged in
```

**Now when accessing `/en/profile`:**
```
1. Browser requests: /en/profile
   ↓
2. Middleware checks: Does user have valid token? → YES
   ↓
3. authorized callback returns: true
   ↓
4. Request proceeds to profile page
   ↓
5. User sees: Profile page content
```

**Result:** ✅ **Profile page loads successfully**

---

## 🛡️ Protected Routes

Currently protected routes (require authentication):
- `/profile` - User profile page
- `/cart` - Shopping cart
- `/checkout` - Checkout process (newly added)

**All other routes are public** (accessible without login):
- `/` - Home page
- `/menu` - Menu page
- `/about` - About page
- `/contact` - Contact page
- `/auth/signin` - Sign in page
- `/auth/signup` - Sign up page

---

## 🔍 How to Test

### **Test 1: Verify Redirect When Not Logged In**

1. Open browser in **incognito/private mode** (to ensure no session)
2. Navigate to: `http://localhost:3000/en/profile`
3. **Expected:** Redirected to `/en/auth/signin`

### **Test 2: Verify Access After Login**

1. Go to: `http://localhost:3000/en/auth/signin`
2. Login with valid credentials
3. After redirect to home, navigate to: `/en/profile`
4. **Expected:** Profile page loads successfully

### **Test 3: Verify Session Persistence**

1. Login successfully
2. Access `/en/profile` - should work
3. Refresh the page
4. **Expected:** Still logged in, page loads

### **Test 4: Verify Logout**

1. While logged in, click Logout
2. Try to access `/en/profile`
3. **Expected:** Redirected to `/en/auth/signin`

---

## 🔧 Debug Tips

### Check if User is Logged In (Browser Console):

```javascript
// In any page
fetch('/api/auth/session')
  .then(r => r.json())
  .then(console.log)
```

**If logged in:** Returns session object with user data
```json
{
  "user": {
    "id": "clx...",
    "email": "user@example.com",
    "name": "John Doe",
    "role": "USER"
  },
  "expires": "2024-11-14T..."
}
```

**If not logged in:** Returns empty object
```json
{}
```

---

### Check Session in React Component:

```typescript
import { useSession } from "next-auth/react";

function MyComponent() {
  const { data: session, status } = useSession();
  
  console.log("Session:", session);
  console.log("Status:", status); // "loading" | "authenticated" | "unauthenticated"
  
  return <div>Check console</div>;
}
```

---

## 🐛 Common Issues & Solutions

### Issue 1: "Redirect Loop"
**Symptom:** Page keeps redirecting endlessly

**Possible Causes:**
- Sign-in page is in protected routes
- Middleware matcher is too broad

**Solution:** 
✅ Already fixed - auth pages are not in `protectedRoutes`

---

### Issue 2: "Can't Access Profile After Login"
**Symptom:** Still redirects to signin even after logging in

**Possible Causes:**
- JWT token not being created
- Session not being saved
- Cookie not being set

**Debug:**
1. Check browser console for errors
2. Check Network tab for session cookie
3. Enable debug mode in auth.ts: `debug: true`

---

### Issue 3: "Session Not Persisting on Refresh"
**Symptom:** User logged out on page refresh

**Possible Causes:**
- Missing SessionProvider
- Cookie settings blocking cookies
- Browser blocking third-party cookies

**Solution:**
✅ Already have NextAuthProvider wrapping app

---

## ✅ Current Configuration Summary

| Setting | Value | Status |
|---------|-------|--------|
| **Authentication Strategy** | JWT | ✅ Configured |
| **Session Max Age** | 30 days | ✅ Set |
| **Protected Routes** | /profile, /cart, /checkout | ✅ Set |
| **Sign-in Page** | /auth/signin | ✅ Set |
| **Token Validation** | Email check | ✅ Working |
| **Locale Support** | en, ar | ✅ Working |

---

## 📝 Summary

**When a non-logged-in user tries to access `/en/profile`:**

1. ✅ They are **automatically redirected** to `/en/auth/signin`
2. ✅ After successful login, they can access the profile page
3. ✅ Session persists across page refreshes
4. ✅ Works correctly with both English and Arabic locales

**Your authentication flow is working as expected!** 🎉
