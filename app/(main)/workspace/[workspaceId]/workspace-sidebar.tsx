import React from "react";
import { AlertTriangle, HashIcon, MessageSquareText } from "lucide-react";

import { useWorkspaceId } from "@/hooks/useWorkspaceId";
import Loader from "@/components/common/loader";

import { useGetChannels } from "@/features/channels/api/use-get-channels";
import { useCurrentMember } from "@/features/members/api/use-current-member";
import { useGetWorkspace } from "@/features/workspaces/api/use-get-workspace";
import SidebarItem from "./sidebar-item";
import WorkspaceHeader from "./workspace-header";
import { WorkspaceSection } from "./workspace-section";

const WorkspaceSidebar = () => {
  const workspaceId = useWorkspaceId();

  const { data: member, isLoading: isMemberLoading } = useCurrentMember({ workspaceId });
  const { data: workspace, isLoading: isWorkspaceLoading } = useGetWorkspace({ id: workspaceId });
  const { data: channels, isLoading: isChannelsLoading } = useGetChannels({ workspaceId });
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
      <div className="mt-3 flex flex-col px-2">
        <SidebarItem label="Threads" icon={MessageSquareText} id="threads" variant="active" />
        <SidebarItem label="Threads" icon={MessageSquareText} id="threads" variant="default" />
        <SidebarItem label="Threads" icon={MessageSquareText} id="threads" variant="default" />
      </div>

      <WorkspaceSection label="Channels" hint="New Channel" onNew={() => {}}>
        {channels?.map((item) => <SidebarItem key={item._id} label={item.name} icon={HashIcon} id={item._id} />)}
      </WorkspaceSection>
    </div>
  );
};

export default WorkspaceSidebar;
