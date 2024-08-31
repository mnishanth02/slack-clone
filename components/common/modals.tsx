import { useMountedState } from "react-use";

import { CreateWorkspaceModal } from "@/features/workspaces/components/create-workspace-modal";

export const Modals = () => {
  const isMounted = useMountedState();

  if (!isMounted) return null;

  return (
    <>
      <CreateWorkspaceModal />
    </>
  );
};
