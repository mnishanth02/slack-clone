import { usePathname } from "next/navigation";
import { Bell, Home, MessageSquare, MoreHorizontal } from "lucide-react";

import ThemeToggle from "@/components/common/theme-toggle";

import UserButton from "@/features/auth/components/user-button";
import SidebarButton from "./sidebar-button";
import WorkspaceSwitcher from "./workspace-switcher";

export const Sidebar = () => {
  const pathname = usePathname();
  const isActive = (path: string) => {
    return pathname.includes(path);
  };

  return (
    <aside className="flex h-full w-20 flex-col items-center gap-y-4 bg-secondary p-2">
      <WorkspaceSwitcher />
      <SidebarButton icon={Home} label="Home" isActive={isActive("/workspace")} />
      <SidebarButton icon={MessageSquare} label="DMs" />
      <SidebarButton icon={Bell} label="Activity" />
      <SidebarButton icon={MoreHorizontal} label="More" />
      <div className="mt-auto flex flex-col items-center justify-between gap-y-1">
        <ThemeToggle />
        <UserButton />
      </div>
    </aside>
  );
};
