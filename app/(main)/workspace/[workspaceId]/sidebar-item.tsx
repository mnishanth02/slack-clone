import Link from "next/link";
import { cva, VariantProps } from "class-variance-authority";
import { LucideIcon } from "lucide-react";
import { IconType } from "react-icons/lib";

import { cn } from "@/lib/utils";
import { useWorkspaceId } from "@/hooks/useWorkspaceId";
import { Button } from "@/components/ui/button";

const sidebarItemVarients = cva(
  "flex items-center justify-start gap-1.5 rounded-md px-3.5 h-8 text-sm overflow-hidden font-normal",
  {
    variants: {
      variant: {
        default: "",
        active: "bg-accent ",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

interface SidebarItemProps {
  label: string;
  id: string;
  icon: LucideIcon | IconType;
  variant?: VariantProps<typeof sidebarItemVarients>["variant"];
}

const SidebarItem = ({ label, icon: Icon, id, variant }: SidebarItemProps) => {
  const workspaceId = useWorkspaceId();

  return (
    <Button asChild variant="ghost" size="sm" className={cn(sidebarItemVarients({ variant }))}>
      <Link href={`/workspace/${workspaceId}/channel/${id}`}>
        <Icon className="mr-1 size-4 shrink-0" />
        <span className="truncate text-sm">{label}</span>
      </Link>
    </Button>
  );
};

export default SidebarItem;
