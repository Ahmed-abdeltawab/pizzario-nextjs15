import { Button } from "@/components/ui/button";

interface SettingButtonProps {
  icon: React.ReactNode;
  label: string;
  variant?: "outline" | "destructive";
  onClick?: () => void;
}

export function SettingButton({
  icon,
  label,
  variant = "outline",
  onClick,
}: SettingButtonProps) {
  return (
    <Button
      variant={variant}
      className="w-full justify-start h-[3em] text-[0.95em]"
      onClick={onClick}
    >
      {icon}
      {label}
    </Button>
  );
}
