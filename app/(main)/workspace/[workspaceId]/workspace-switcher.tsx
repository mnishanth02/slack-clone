import React from "react";
import { useRouter } from "next/navigation";
import { Loader, Loader2, PlusIcon } from "lucide-react";

import { useWorkspaceId } from "@/hooks/useWorkspaceId";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useGetWorkspace } from "@/features/workspaces/api/use-get-workspace";
import { useGetWorkspaces } from "@/features/workspaces/api/use-get-workspaces";
import { useCreateWorkspaceModal } from "@/features/workspaces/store/use-create-workspace-modal";

const WorkspaceSwitcher = () => {
  const router = useRouter();
  const workspaceId = useWorkspaceId();

  const [_open, setOpen] = useCreateWorkspaceModal();
  const { data: workspaces, isLoading: workspacesLoading } = useGetWorkspaces();
  const { data: workspace, isLoading: workspaceLoading } = useGetWorkspace({ id: workspaceId });

  const filteredWorkspaces = workspaces?.filter((w) => w._id !== workspaceId);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="relative size-9 overflow-hidden text-xl font-semibold">
          {workspaceLoading ? (
            <Loader className="size-5 shrink-0 animate-spin" />
          ) : (
            // <Loader />
            workspace?.name.charAt(0).toUpperCase()
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="bottom" align="start" className="w-64">
        <DropdownMenuItem
          onClick={() => router.push(`/workspace/${workspaceId}`)}
          className="cursor-pointer flex-col items-start justify-start capitalize"
        >
          {workspace?.name}
          <span className="text-xs text-muted-foreground">Active workspace</span>
        </DropdownMenuItem>
        {filteredWorkspaces?.map((workspace) => (
          <DropdownMenuItem
            key={workspace._id}
            onClick={() => router.push(`/workspace/${workspace._id}`)}
            className="cursor-pointer overflow-hidden capitalize text-secondary-foreground"
          >
            <span className="mr-2 flex size-9 shrink-0 items-center justify-center rounded-md bg-muted text-lg font-semibold uppercase">
              {workspace.name.charAt(0).toUpperCase()}
            </span>
            <p className="truncate">{workspace.name}</p>
          </DropdownMenuItem>
        ))}
        <DropdownMenuItem onClick={() => setOpen(true)} className="cursor-pointer capitalize">
          <PlusIcon className="mr-2 size-4" />
          Create new workspace
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default WorkspaceSwitcher;
