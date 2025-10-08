# Internationalization (i18n) Documentation

## Overview
This app supports **English (en)** and **Arabic (ar)** with full RTL support for Arabic.

## Structure

### Configuration Files
- **`src/i18n-config.ts`**: Defines supported locales and default locale
- **`src/middleware.ts`**: Handles automatic locale detection and routing
- **`src/lib/getDictionary.ts`**: Loads translation dictionaries

### Translation Files
- **`src/dictionaries/en.json`**: English translations
- **`src/dictionaries/ar.json`**: Arabic translations (RTL)

## How It Works

### 1. Automatic Locale Detection
The middleware automatically:
- Detects user's preferred language from browser headers
- Redirects `/` to `/en/` or `/ar/` based on preference
- Ensures all routes include a locale prefix

### 2. RTL Support
Arabic pages automatically:
- Set `dir="rtl"` on the `<html>` tag
- Mirror the entire layout
- Display text right-to-left

### 3. Language Switcher
The language switcher in the header:
- Shows current language (English/العربية)
- Allows switching between locales
- Preserves the current page path when switching

## Usage Guide

### Using Translations in Server Components

```typescript
import { getDictionary } from "@/lib/getDictionary";
import type { Locale } from "@/i18n-config";

export default async function MyPage({
  params,
}: {
  params: { locale: Locale };
}) {
  const dict = await getDictionary(params.locale);
  
  return (
    <div>
      <h1>{dict.hero.title}</h1>
      <p>{dict.hero.description}</p>
    </div>
  );
}
```

### Using Translations in Client Components

For client components, you'll need to pass translations as props:

```typescript
// In Server Component (page.tsx)
export default async function Page({ params }: { params: { locale: Locale } }) {
  const dict = await getDictionary(params.locale);
  
  return <MyClientComponent translations={dict} />;
}

// In Client Component
'use client';
export function MyClientComponent({ translations }: { translations: any }) {
  return <button>{translations.common.save}</button>;
}
```

### Linking Between Pages

Always include the locale in links:

```typescript
import Link from "next/link";

// Good ✅
<Link href={`/${params.locale}/menu`}>Menu</Link>

// Bad ❌ (will redirect unnecessarily)
<Link href="/menu">Menu</Link>
```

## Translation Structure

```json
{
  "nav": { ... },           // Navigation items
  "hero": { ... },          // Hero section
  "bestSellers": { ... },   // Best sellers section
  "whyChooseUs": { ... },   // Features section
  "testimonials": { ... },  // Testimonials
  "contact": { ... },       // Contact info
  "cart": { ... },          // Shopping cart
  "product": { ... },       // Product details
  "auth": { ... },          // Authentication
  "notFound": { ... },      // 404 page
  "common": { ... }         // Common UI elements
}
```

## Adding New Translations

### 1. Add to English Dictionary (`en.json`)
```json
{
  "mySection": {
    "title": "My Title",
    "description": "My Description"
  }
}
```

### 2. Add to Arabic Dictionary (`ar.json`)
```json
{
  "mySection": {
    "title": "عنواني",
    "description": "وصفي"
  }
}
```

### 3. Use in Components
```typescript
const dict = await getDictionary(params.locale);
return <h1>{dict.mySection.title}</h1>;
```

## Adding New Languages

### 1. Update `src/constants/enums.ts`
```typescript
export enum Languages {
  ENGLISH = "en",
  ARABIC = "ar",
  FRENCH = "fr",  // Add new language
}
```

### 2. Update `src/i18n-config.ts`
```typescript
export const i18n: i18Type = {
  defaultLocale: Languages.ENGLISH,
  locales: [Languages.ARABIC, Languages.ENGLISH, Languages.FRENCH],
};
```

### 3. Create Dictionary File
Create `src/dictionaries/fr.json` with all translations

### 4. Update `src/lib/getDictionary.ts`
```typescript
const dictionaries = {
  en: () => import("@/dictionaries/en.json").then((module) => module.default),
  ar: () => import("@/dictionaries/ar.json").then((module) => module.default),
  fr: () => import("@/dictionaries/fr.json").then((module) => module.default),
};
```

### 5. Update Language Switcher
Add to `src/components/header/lang-switcher.tsx`:
```typescript
const languages = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية' },
  { code: 'fr', name: 'French', nativeName: 'Français' },
];
```

## Testing

### Test Locale Switching
1. Visit `http://localhost:3000`
2. Should redirect to `/en/` or `/ar/` based on browser settings
3. Use language switcher to change locale
4. Verify RTL layout for Arabic

### Test 404 Pages
- Visit `/en/nonexistent` - should show English 404
- Visit `/ar/nonexistent` - should show Arabic 404 in RTL

## Best Practices

1. **Always use translations**: Never hardcode user-facing text
2. **Keep keys organized**: Group related translations together
3. **Maintain parity**: Ensure all languages have the same keys
4. **Test RTL**: Always test Arabic version for layout issues
5. **Use semantic keys**: `auth.loginButton` not `button1`

## Common Issues

### Issue: Page redirects infinitely
**Solution**: Make sure your page component is inside `app/[locale]/` not `app/`

### Issue: Translations not updating
**Solution**: Clear `.next` folder and rebuild: `rm -rf .next && npm run dev`

### Issue: RTL layout broken
**Solution**: Check that `dir="rtl"` is set in `[locale]/layout.tsx`

### Issue: Language switcher doesn't work
**Solution**: Ensure you're using Next.js `useRouter` and `usePathname` from `next/navigation`

## Files Updated

✅ `src/lib/getDictionary.ts` - Fixed locale references (en, ar)
✅ `src/dictionaries/en.json` - Added comprehensive English translations
✅ `src/dictionaries/ar.json` - Added comprehensive Arabic translations
✅ `src/app/layout.tsx` - Simplified to pass-through for locale routing
✅ `src/app/[locale]/layout.tsx` - Added RTL support and proper locale handling
✅ `src/components/header/lang-switcher.tsx` - Made functional with route navigation
✅ `src/app/[locale]/not-found.tsx` - Created localized 404 page

## Next Steps

1. Add translations to your existing pages
2. Test all features in both languages
3. Add more languages if needed
4. Consider using a translation management service for larger apps
