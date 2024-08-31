import React from "react";
import { AlertTriangle } from "lucide-react";

import { useWorkspaceId } from "@/hooks/useWorkspaceId";
import Loader from "@/components/common/loader";

import { useCurrentMember } from "@/features/members/api/use-current-member";
import { useGetWorkspace } from "@/features/workspaces/api/use-get-workspace";
import WorkspaceHeader from "./workspace-header";

const WorkspaceSidebar = () => {
  const workspaceId = useWorkspaceId();

  const { data: member, isLoading: isMemberLoading } = useCurrentMember({ workspaceId });
  const { data: workspace, isLoading: isWorkspaceLoading } = useGetWorkspace({ id: workspaceId });
  if (isMemberLoading || isWorkspaceLoading) {
    return <Loader />;
  }
  if (!workspace || !member) {
    return (
      <div className="flex h-full flex-col items-center justify-center text-secondary-foreground">
        <AlertTriangle className="size-5" />
        <span className="text-sm">Workspace not found</span>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col">
      <WorkspaceHeader workspace={workspace} isAdmin={member?.role === "admin"} />
    </div>
  );
};

export default WorkspaceSidebar;
