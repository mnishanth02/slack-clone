import { Info, Search } from "lucide-react";

import { useWorkspaceId } from "@/hooks/useWorkspaceId";
import { Button } from "@/components/ui/button";

import { useGetWorkspace } from "@/features/workspaces/api/use-get-workspace";

const Toolbar = () => {
  const workspaceId = useWorkspaceId();
  const { data: workspace } = useGetWorkspace({ id: workspaceId });
  return (
    <nav className="flex h-10 items-center justify-between bg-secondary p-1.5">
      <div className="flex-1" />
      <div className="max-[642px] min-w-[280px] shrink grow-[2]">
        <Button size={"sm"} variant={"outline"} className="h-7 w-full justify-start px-2 hover:bg-background">
          <Search className="mr-2 size-4 text-secondary-foreground" />
          <span className="text-sm text-secondary-foreground">Search {workspace?.name}</span>
        </Button>
      </div>
      <div className="ml-auto flex flex-1 items-center justify-end">
        <Button size={"icon"} variant={"ghost"}>
          <Info className="size-5 text-secondary-foreground" />
        </Button>
      </div>
    </nav>
  );
};

export default Toolbar;
