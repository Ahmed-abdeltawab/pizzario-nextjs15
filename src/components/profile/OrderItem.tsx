interface OrderItemProps {
  orderNumber: string;
  date: string;
  status: "Delivered" | "In Transit" | "Pending" | "Cancelled";
  items: string;
  total: string;
}

const statusStyles = {
  Delivered: "bg-green-500/10 text-green-600 dark:text-green-400",
  "In Transit": "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  Pending: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400",
  Cancelled: "bg-red-500/10 text-red-600 dark:text-red-400",
};

export function OrderItem({
  orderNumber,
  date,
  status,
  items,
  total,
}: OrderItemProps) {
  return (
    <div className="p-[1em] bg-muted/20 rounded-lg border border-border/30 hover:border-primary/30 transition-colors">
      <div className="flex items-center justify-between mb-[0.75em]">
        <div>
          <p className="font-semibold text-[1em]">Order #{orderNumber}</p>
          <p className="text-[0.85em] text-muted-foreground">{date}</p>
        </div>
        <span
          className={`px-[1em] py-[0.5em] rounded-full text-[0.85em] font-medium ${statusStyles[status]}`}
        >
          {status}
        </span>
      </div>
      <div className="flex items-center justify-between">
        <p className="text-[0.9em] text-muted-foreground">{items}</p>
        <p className="font-semibold text-[1em]">{total}</p>
      </div>
    </div>
  );
}
