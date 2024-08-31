"use client";

import { useWorkspaceId } from "@/hooks/useWorkspaceId";

import { useGetWorkspace } from "@/features/workspaces/api/use-get-workspace";

export default function WorkspaceIdPage() {
  const workspaceId = useWorkspaceId();
  const { data: workspace, isLoading } = useGetWorkspace({ id: workspaceId });

  return <div>Workspace - Id Page</div>;
}
