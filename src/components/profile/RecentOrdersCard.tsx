import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { OrderItem } from "./OrderItem";

interface RecentOrdersCardProps {
  dict: any;
}

// Mock data - replace with real data from database
const mockOrders = [
  {
    orderNumber: "12345",
    date: "Dec 15, 2024",
    status: "Delivered" as const,
    items: "2x Margherita Pizza, 1x Caesar Salad",
    total: "$45.99",
  },
  {
    orderNumber: "12344",
    date: "Dec 10, 2024",
    status: "Delivered" as const,
    items: "1x Pepperoni Pizza, 2x Coca Cola",
    total: "$32.50",
  },
  {
    orderNumber: "12343",
    date: "Dec 5, 2024",
    status: "In Transit" as const,
    items: "3x Hawaiian Pizza",
    total: "$67.50",
  },
];

export function RecentOrdersCard({ dict }: RecentOrdersCardProps) {
  return (
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
          {mockOrders.map((order) => (
            <OrderItem key={order.orderNumber} {...order} />
          ))}
        </div>

        <Button variant="outline" className="w-full mt-[1.5em] h-[2.5em]">
          View All Orders
        </Button>
      </CardContent>
    </Card>
  );
}
