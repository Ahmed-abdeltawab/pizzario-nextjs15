# Locale Usage Examples

This document shows how to use the `getCurrentLocale` function in different scenarios.

## Server Components (Recommended)

### Example 1: Using getCurrentLocale in HeroSection

```tsx
import { getCurrentLocale } from "@/lib/getCurrentLocale";
import { getDictionary } from "@/lib/getDictionary";

const HeroSection = async () => {
  const locale = await getCurrentLocale();
  const dict = await getDictionary(locale);
  
  return (
    <section>
      <h1>{dict.hero.title}</h1>
      <p>{dict.hero.description}</p>
    </section>
  );
};
```

### Example 2: Using in any Server Component

```tsx
import { getCurrentLocale } from "@/lib/getCurrentLocale";

const MyComponent = async () => {
  const locale = await getCurrentLocale();
  
  return (
    <div>
      <p>Current locale: {locale}</p>
      <a href={`/${locale}/about`}>About</a>
    </div>
  );
};
```

## Client Components

### Example: Using getLocaleFromPathname

```tsx
'use client';

import { usePathname } from 'next/navigation';
import { getLocaleFromPathname } from "@/lib/getCurrentLocale";

const ClientComponent = () => {
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname);
  
  return (
    <div>
      <p>Current locale: {locale}</p>
    </div>
  );
};
```

## Benefits

1. **No Prop Drilling**: Components get locale directly without passing it through props
2. **Cleaner Code**: Less boilerplate and more maintainable
3. **Type Safety**: Full TypeScript support with `Locale` type
4. **Flexible**: Works in both server and client components

## Available Functions

### `getCurrentLocale()`
- **Type**: `Promise<Locale>`
- **Use Case**: Server Components
- **Description**: Extracts locale from request headers

### `getLocaleFromPathname(pathname: string)`
- **Type**: `Locale`
- **Use Case**: Client Components
- **Description**: Extracts locale from URL pathname
