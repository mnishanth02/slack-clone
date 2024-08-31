import { useAuthActions } from "@convex-dev/auth/react";
import { Loader2, LogOut } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useCurrentUser } from "../api/use-current-user";

const UserButton = () => {
  const { user, isLoading } = useCurrentUser();
  const { signOut } = useAuthActions();

  if (isLoading) return <Loader2 className="size-4 animate-spin text-muted-foreground" />;

  if (!user) {
    return null;
  }

  const { name, image } = user;
  const avatarFallback = name?.charAt(0).toUpperCase() ?? "?";

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className="relative outline-none">
        <Avatar className="size-10 transition hover:opacity-75">
          <AvatarImage alt={`User Avatar ${name}`} src={image} />
          <AvatarFallback className="bg-secondary text-secondary-foreground">{avatarFallback}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center" className="w-60" side="bottom">
        <DropdownMenuItem onClick={signOut} className="cursor-pointer">
          <LogOut className="mr-2 size-4" />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserButton;
