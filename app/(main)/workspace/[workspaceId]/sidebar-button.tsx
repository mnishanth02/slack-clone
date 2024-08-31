import { LucideIcon } from "lucide-react";
import { IconType } from "react-icons/lib";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface SidebarButtonProps {
  icon: LucideIcon | IconType;
  label: string;
  isActive?: boolean;
}

const SidebarButton = ({ icon: Icon, label, isActive }: SidebarButtonProps) => {
  return (
    <div className="group flex cursor-pointer flex-col items-center gap-y-0.5">
      <Button variant="ghost" className={cn("size-9 p-2 group-hover:bg-background", isActive && "bg-background")}>
        <Icon className="text-background-foreground size-5 transition-all group-hover:scale-110" />
      </Button>
      <span className="text-background-foreground text-xs group-hover:text-foreground">{label}</span>
    </div>
  );
};

export default SidebarButton;
