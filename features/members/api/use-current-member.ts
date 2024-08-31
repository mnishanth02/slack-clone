import { convexQuery } from "@convex-dev/react-query";
import { useQuery } from "@tanstack/react-query";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

interface UseGetWorkspaceProps {
  workspaceId: Id<"workspaces">;
}
export const useCurrentMember = ({ workspaceId }: UseGetWorkspaceProps) => {
  return useQuery(convexQuery(api.members.current, { workspaceId }));
};
