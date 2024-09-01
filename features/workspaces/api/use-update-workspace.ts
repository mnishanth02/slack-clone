import { useConvexMutation } from "@convex-dev/react-query";
import { useMutation } from "@tanstack/react-query";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

interface UseGetWorkspaceProps {}

export const useUpdateWorkspace = () => {
  return useMutation({
    mutationFn: useConvexMutation(api.workspaces.update),
  });
};
