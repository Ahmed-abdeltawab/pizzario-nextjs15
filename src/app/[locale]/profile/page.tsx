import { getDictionary } from "@/lib/getDictionary";
import { type Locale } from "@/i18n-config";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getServerSession } from "next-auth";
import { authOptions } from "@/server/auth";
import { redirect } from "next/navigation";

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const session = await getServerSession(authOptions);
  // Mock user data for design purposes
  const mockUser = {
    fullName: session?.user.name,
    email: session?.user.email,
    phone: "+1 (555) 123-4567",
    address: "123 Pizza Street, Food City, FC 12345",
    memberSince: "January 2024",
    avatar: "JD",
    ordersCount: 42,
    favoriteItems: 5,
    totalSpent: "$1,234.56",
  };
  console.log("Session in profile page:", session);
  if (!session) {
    redirect(`/${locale}/auth/signin`);
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/5 to-primary/5 py-[2rem] px-[1rem]">
      <div className="max-w-[75rem] mx-auto">
        {/* Header Section */}
        <div className="mb-[2rem]">
          <h1 className="text-[2.5rem] font-bold text-foreground mb-[0.5em]">
            {dict.auth.profile.title}
          </h1>
          <p className="text-[1.1em] text-muted-foreground">
            {dict.auth.profile.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-[1.5rem]">
          {/* Left Sidebar - Profile Summary */}
          <div className="lg:col-span-1">
            <Card className="backdrop-blur-[1em] bg-card/80 border-border/50 shadow-lg sticky top-[2rem]">
              <CardHeader className="text-center pb-[1em]">
                {/* Avatar */}
                <div className="mx-auto mb-[1em] w-[6rem] h-[6rem] rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-primary-foreground text-[2rem] font-bold shadow-lg">
                  {mockUser.avatar}
                </div>

                <CardDescription className="text-[0.95em]">
                  {mockUser.email}
                </CardDescription>
                <div className="mt-[1em] pt-[1em] border-t border-border/50">
                  <p className="text-[0.85em] text-muted-foreground">
                    {dict.auth.profile.memberSince}
                  </p>
                  <p className="text-[1em] font-semibold text-foreground mt-[0.25em]">
                    {mockUser.memberSince}
                  </p>
                </div>
              </CardHeader>
              <CardContent className="space-y-[1em]">
                {/* Stats */}
                <div className="grid grid-cols-3 gap-[0.5em] p-[1em] bg-muted/30 rounded-lg">
                  <div className="text-center">
                    <p className="text-[1.5rem] font-bold text-primary">
                      {mockUser.ordersCount}
                    </p>
                    <p className="text-[0.75em] text-muted-foreground">
                      {dict.auth.profile.orderHistory}
                    </p>
                  </div>
                  <div className="text-center border-x border-border/50">
                    <p className="text-[1.5rem] font-bold text-primary">
                      {mockUser.favoriteItems}
                    </p>
                    <p className="text-[0.75em] text-muted-foreground">
                      Favorites
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-[1.5rem] font-bold text-primary">
                      {mockUser.totalSpent}
                    </p>
                    <p className="text-[0.75em] text-muted-foreground">Spent</p>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="space-y-[0.75em] pt-[1em]">
                  <Button
                    variant="outline"
                    className="w-full justify-start h-[2.5em] text-[0.95em]"
                  >
                    <svg
                      className="w-[1.25em] h-[1.25em] mr-[0.75em] rtl:mr-0 rtl:ml-[0.75em]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    {dict.auth.profile.editProfile}
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start h-[2.5em] text-[0.95em]"
                  >
                    <svg
                      className="w-[1.25em] h-[1.25em] mr-[0.75em] rtl:mr-0 rtl:ml-[0.75em]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                    {dict.auth.profile.changePassword}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-[1.5rem]">
            {/* Personal Information Card */}
            <Card className="backdrop-blur-[1em] bg-card/80 border-border/50 shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-[1.5rem] font-bold flex items-center">
                      <svg
                        className="w-[1.5em] h-[1.5em] mr-[0.5em] rtl:mr-0 rtl:ml-[0.5em] text-primary"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                      {dict.auth.profile.personalInfo}
                    </CardTitle>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-primary hover:text-primary/80"
                  >
                    <svg
                      className="w-[1.25em] h-[1.25em] mr-[0.5em] rtl:mr-0 rtl:ml-[0.5em]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                    {dict.common.edit}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-[1.25em]">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-[1.25em]">
                  <div className="space-y-[0.5em]">
                    <Label className="text-[0.9em] text-muted-foreground">
                      {dict.auth.fullName}
                    </Label>
                    <Input
                      value={mockUser.fullName}
                      readOnly
                      className="h-[2.75em] text-[1em] bg-muted/20"
                    />
                  </div>

                  <div className="space-y-[0.5em]">
                    <Label className="text-[0.9em] text-muted-foreground">
                      {dict.auth.email}
                    </Label>
                    <Input
                      value={mockUser.email}
                      readOnly
                      className="h-[2.75em] text-[1em] bg-muted/20"
                    />
                  </div>
                  <div className="space-y-[0.5em]">
                    <Label className="text-[0.9em] text-muted-foreground">
                      {dict.auth.phone}
                    </Label>
                    <Input
                      value={mockUser.phone}
                      readOnly
                      className="h-[2.75em] text-[1em] bg-muted/20"
                    />
                  </div>
                  <div className="space-y-[0.5em] md:col-span-2">
                    <Label className="text-[0.9em] text-muted-foreground">
                      {dict.auth.address}
                    </Label>
                    <Input
                      value={mockUser.address}
                      readOnly
                      className="h-[2.75em] text-[1em] bg-muted/20"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Orders Card */}
            <Card className="backdrop-blur-[1em] bg-card/80 border-border/50 shadow-lg">
              <CardHeader>
                <CardTitle className="text-[1.5rem] font-bold flex items-center">
                  <svg
                    className="w-[1.5em] h-[1.5em] mr-[0.5em] rtl:mr-0 rtl:ml-[0.5em] text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                    />
                  </svg>
                  {dict.auth.profile.orderHistory}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-[1em]">
                  {/* Order Item 1 */}
                  <div className="p-[1em] bg-muted/20 rounded-lg border border-border/30 hover:border-primary/30 transition-colors">
                    <div className="flex items-center justify-between mb-[0.75em]">
                      <div>
                        <p className="font-semibold text-[1em]">Order #12345</p>
                        <p className="text-[0.85em] text-muted-foreground">
                          Dec 15, 2024
                        </p>
                      </div>
                      <span className="px-[1em] py-[0.5em] bg-green-500/10 text-green-600 dark:text-green-400 rounded-full text-[0.85em] font-medium">
                        Delivered
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-[0.9em] text-muted-foreground">
                        2x Margherita Pizza, 1x Caesar Salad
                      </p>
                      <p className="font-semibold text-[1em]">$45.99</p>
                    </div>
                  </div>

                  {/* Order Item 2 */}
                  <div className="p-[1em] bg-muted/20 rounded-lg border border-border/30 hover:border-primary/30 transition-colors">
                    <div className="flex items-center justify-between mb-[0.75em]">
                      <div>
                        <p className="font-semibold text-[1em]">Order #12344</p>
                        <p className="text-[0.85em] text-muted-foreground">
                          Dec 10, 2024
                        </p>
                      </div>
                      <span className="px-[1em] py-[0.5em] bg-green-500/10 text-green-600 dark:text-green-400 rounded-full text-[0.85em] font-medium">
                        Delivered
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-[0.9em] text-muted-foreground">
                        1x Pepperoni Pizza, 2x Coca Cola
                      </p>
                      <p className="font-semibold text-[1em]">$32.50</p>
                    </div>
                  </div>

                  {/* Order Item 3 */}
                  <div className="p-[1em] bg-muted/20 rounded-lg border border-border/30 hover:border-primary/30 transition-colors">
                    <div className="flex items-center justify-between mb-[0.75em]">
                      <div>
                        <p className="font-semibold text-[1em]">Order #12343</p>
                        <p className="text-[0.85em] text-muted-foreground">
                          Dec 5, 2024
                        </p>
                      </div>
                      <span className="px-[1em] py-[0.5em] bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-full text-[0.85em] font-medium">
                        In Transit
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-[0.9em] text-muted-foreground">
                        3x Hawaiian Pizza
                      </p>
                      <p className="font-semibold text-[1em]">$67.50</p>
                    </div>
                  </div>
                </div>

                <Button
                  variant="outline"
                  className="w-full mt-[1.5em] h-[2.5em]"
                >
                  View All Orders
                </Button>
              </CardContent>
            </Card>

            {/* Account Settings Card */}
            <Card className="backdrop-blur-[1em] bg-card/80 border-border/50 shadow-lg">
              <CardHeader>
                <CardTitle className="text-[1.5rem] font-bold flex items-center">
                  <svg
                    className="w-[1.5em] h-[1.5em] mr-[0.5em] rtl:mr-0 rtl:ml-[0.5em] text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  {dict.auth.profile.accountSettings}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-[1em]">
                <Button
                  variant="outline"
                  className="w-full justify-start h-[3em] text-[0.95em]"
                >
                  <svg
                    className="w-[1.25em] h-[1.25em] mr-[0.75em] rtl:mr-0 rtl:ml-[0.75em]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  {dict.auth.profile.savedAddresses}
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start h-[3em] text-[0.95em]"
                >
                  <svg
                    className="w-[1.25em] h-[1.25em] mr-[0.75em] rtl:mr-0 rtl:ml-[0.75em]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                    />
                  </svg>
                  {dict.auth.profile.paymentMethods}
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start h-[3em] text-[0.95em]"
                >
                  <svg
                    className="w-[1.25em] h-[1.25em] mr-[0.75em] rtl:mr-0 rtl:ml-[0.75em]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                  </svg>
                  {dict.auth.profile.notifications}
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start h-[3em] text-[0.95em]"
                >
                  <svg
                    className="w-[1.25em] h-[1.25em] mr-[0.75em] rtl:mr-0 rtl:ml-[0.75em]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                  {dict.auth.profile.security}
                </Button>
                <div className="pt-[1em] border-t border-border/50">
                  <Button
                    variant="destructive"
                    className="w-full justify-start h-[3em] text-[0.95em]"
                  >
                    <svg
                      className="w-[1.25em] h-[1.25em] mr-[0.75em] rtl:mr-0 rtl:ml-[0.75em]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                    {dict.auth.profile.deleteAccount}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
