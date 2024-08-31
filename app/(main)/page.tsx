"use client";

import { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";

import UserButton from "@/features/auth/components/user-button";
import { useGetWorkspaces } from "@/features/workspaces/api/use-get-workspaces";
import { useCreateWorkspaceModal } from "@/features/workspaces/store/use-create-workspace-modal";

export default function Home() {
  const router = useRouter();
  const { data: workspaces, isLoading } = useGetWorkspaces();
  const [isOpen, setIsOpen] = useCreateWorkspaceModal();
  const workspaceId = useMemo(() => workspaces?.[0]?._id, [workspaces]);

  useEffect(() => {
    if (isLoading) return;

    if (workspaceId) {
      router.push(`/workspace/${workspaceId}`);
    } else if (!isOpen) {
      setIsOpen(true);
    }
  }, [isLoading, workspaceId, isOpen, setIsOpen, router]);

  return (
    <main className="flex h-full flex-col items-center justify-center">
      <UserButton />
    </main>
  );
}
