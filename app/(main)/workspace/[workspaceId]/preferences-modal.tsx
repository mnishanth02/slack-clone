import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

import { useConfirm } from "@/hooks/use-confirm";
import { useWorkspaceId } from "@/hooks/useWorkspaceId";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

import { useRemoveWorkspace } from "@/features/workspaces/api/use-remove-workspace";
import { useUpdateWorkspace } from "@/features/workspaces/api/use-update-workspace";

interface PreferencesModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  intialValue: string;
}

const PreferencesModal = ({ open, setOpen, intialValue }: PreferencesModalProps) => {
  const router = useRouter();
  const [ConfirmDialog, confirm] = useConfirm(
    "Are you sure you want to delete this workspace?",
    "This action cannot be undone."
  );
  const workspaceId = useWorkspaceId();
  const [editOpen, setEditOpen] = useState(false);

  const { mutate: updateWorkspace, isPending: isUpdatingWorkspace } = useUpdateWorkspace();
  const { mutate: removeWorkspace, isPending: isRemovingWorkspace } = useRemoveWorkspace();

  const handleEditWorkspace = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const nameInput = form.elements.namedItem("name") as HTMLInputElement;

    updateWorkspace(
      { id: workspaceId, name: nameInput.value },
      {
        onSuccess: () => {
          form.reset();
          setEditOpen(false);
          toast.success("Workspace updated");
        },
        onError: (error) => {
          toast.error("Failed to update workspace");
        },
      }
    );
  };

  const handleRemoveWorkspace = async () => {
    const confirmed = await confirm();

    if (!confirmed) {
      return;
    }

    removeWorkspace(
      { id: workspaceId },
      {
        onSuccess: () => {
          toast.success("Workspace removed");
          router.replace("/");
        },
        onError: (error) => {
          toast.error("Failed to remove workspace");
        },
      }
    );
  };

  return (
    <>
      <ConfirmDialog />
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md overflow-hidden p-0 md:max-w-xl">
          <DialogHeader className="border-b p-4">
            <DialogTitle>{intialValue}</DialogTitle>
          </DialogHeader>

          <div className="flex flex-col gap-y-2 px-4 pb-4">
            <Dialog open={editOpen} onOpenChange={setEditOpen}>
              <DialogTrigger asChild>
                <div className="group cursor-pointer rounded-lg border p-5 hover:bg-secondary">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold">Workspace name</p>
                    <p className="text-xs font-semibold text-muted-foreground group-hover:underline group-hover:underline-offset-2">
                      Edit
                    </p>
                  </div>
                  <p className="text-sm">{intialValue}</p>
                </div>
              </DialogTrigger>
              <DialogContent className="max-w-md overflow-hidden md:max-w-xl">
                <DialogHeader>
                  <DialogTitle>Rename this workspace</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleEditWorkspace} className="space-y-4">
                  <Input
                    disabled={isUpdatingWorkspace}
                    required
                    defaultValue={intialValue}
                    name="name"
                    autoFocus
                    minLength={3}
                    placeholder="Workspace name e.g. 'Work', 'Personal', 'School'"
                  />
                  <DialogFooter className="gap-2">
                    <DialogClose asChild>
                      <Button type="button" variant={"outline"} disabled={isUpdatingWorkspace}>
                        Cancel
                      </Button>
                    </DialogClose>
                    <Button type="submit" disabled={isUpdatingWorkspace}>
                      Save
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
            <Button type="button" variant="destructive" disabled={isRemovingWorkspace} onClick={handleRemoveWorkspace}>
              <Trash2 className="mr-2 size-4" />
              <p className="text-sm font-semibold">Delete workspace</p>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PreferencesModal;
