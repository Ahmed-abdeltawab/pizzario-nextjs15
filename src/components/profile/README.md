# Profile Components

This directory contains all the reusable components for the profile page, following clean code principles and the project's coding guidelines.

## Components

### 1. **Header**
Main header section for the profile page displaying the title.

**Usage:**
```tsx
<Header dict={dict} />
```

---

### 2. **ProfileSummary**
Sidebar component showing user avatar, stats, and quick actions.

**Props:**
- `dict`: Dictionary object for translations
- `user`: User object with name, email, and image

**Usage:**
```tsx
<ProfileSummary dict={dict} user={session.user} />
```

---

### 3. **PersonalInfoCard**
Card displaying user's personal information (name, email, phone, address).

**Props:**
- `dict`: Dictionary object for translations
- `user`: User object with personal data

**Features:**
- Read-only input fields
- Edit button (ready for future implementation)
- Responsive grid layout

**Usage:**
```tsx
<PersonalInfoCard dict={dict} user={session.user} />
```

---

### 4. **RecentOrdersCard**
Card showing the user's recent order history.

**Props:**
- `dict`: Dictionary object for translations

**Features:**
- Displays order items with status badges
- "View All Orders" button
- Color-coded status indicators (Delivered, In Transit, Pending, Cancelled)

**Usage:**
```tsx
<RecentOrdersCard dict={dict} />
```

---

### 5. **OrderItem**
Individual order item component used within RecentOrdersCard.

**Props:**
- `orderNumber`: string
- `date`: string
- `status`: "Delivered" | "In Transit" | "Pending" | "Cancelled"
- `items`: string (order items description)
- `total`: string (order total)

**Usage:**
```tsx
<OrderItem
  orderNumber="12345"
  date="Dec 15, 2024"
  status="Delivered"
  items="2x Margherita Pizza, 1x Caesar Salad"
  total="$45.99"
/>
```

---

### 6. **AccountSettingsCard**
Card with account management options.

**Props:**
- `dict`: Dictionary object for translations

**Features:**
- Saved addresses
- Payment methods
- Notifications settings
- Security settings
- Delete account (destructive action)

**Usage:**
```tsx
<AccountSettingsCard dict={dict} />
```

---

### 7. **SettingButton**
Reusable button component for settings actions.

**Props:**
- `icon`: React.ReactNode (SVG icon)
- `label`: string
- `variant`: "outline" | "destructive" (optional, defaults to "outline")
- `onClick`: () => void (optional)

**Usage:**
```tsx
<SettingButton
  icon={<svg>...</svg>}
  label="Saved Addresses"
  variant="outline"
/>
```

---

## Architecture

### Design Principles
1. **Single Responsibility**: Each component has one clear purpose
2. **Reusability**: Components are generic and can be used in different contexts
3. **Prop Types**: All components have properly typed props
4. **Coding Guidelines**: Follows project guidelines (rem/em units, percentage widths)

### File Structure
```
src/components/profile/
├── Header.tsx                 # Page header
├── ProfileSummary.tsx         # User info sidebar
├── PersonalInfoCard.tsx       # Personal information
├── RecentOrdersCard.tsx       # Order history
├── OrderItem.tsx              # Single order item
├── AccountSettingsCard.tsx    # Settings options
├── SettingButton.tsx          # Reusable setting button
├── index.ts                   # Clean exports
└── README.md                  # This file
```

### Usage in Page

```tsx
import {
  Header,
  ProfileSummary,
  PersonalInfoCard,
  RecentOrdersCard,
  AccountSettingsCard,
} from "@/components/profile";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);
  const dict = await getDictionary(locale);

  return (
    <div>
      <Header dict={dict} />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-[1.5rem]">
        <ProfileSummary dict={dict} user={session.user} />
        
        <div className="lg:col-span-2 space-y-[1.5rem]">
          <PersonalInfoCard dict={dict} user={session.user} />
          <RecentOrdersCard dict={dict} />
          <AccountSettingsCard dict={dict} />
        </div>
      </div>
    </div>
  );
}
```

## Future Enhancements

- [ ] Add edit functionality to PersonalInfoCard
- [ ] Connect OrderItem to real database data
- [ ] Implement click handlers for SettingButton actions
- [ ] Add loading states
- [ ] Add error handling
- [ ] Add form validation for editable fields
- [ ] Create modals for settings actions
