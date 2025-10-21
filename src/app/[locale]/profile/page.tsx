import { getDictionary } from "@/lib/getDictionary";
import { type Locale } from "@/i18n-config";
import { getServerSession } from "next-auth";
import { authOptions } from "@/server/auth";
import { redirect } from "next/navigation";
import {
  Header,
  PersonalInfoCard,
  RecentOrdersCard,
  AccountSettingsCard,
} from "@/components/profile";

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect(`/${locale}/auth/signin`);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/5 to-primary/5 py-[2rem] px-[1rem]">
      <div className="max-w-[75rem] mx-auto">
        {/* Header Section */}
        <Header dict={dict} />

        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-[1.5rem]">
          {/* Personal Information Card */}
          <PersonalInfoCard
            dict={dict}
            user={{
              ...session.user,
              image: session.user.image,
            }}
          />

          {/* Recent Orders Card */}
          <RecentOrdersCard dict={dict} />

          {/* Account Settings Card */}
          <AccountSettingsCard dict={dict} />
        </div>
      </div>
    </div>
  );
}
