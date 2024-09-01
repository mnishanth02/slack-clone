import { PlusIcon } from "lucide-react";
import { FaCaretDown } from "react-icons/fa";
import { useToggle } from "react-use";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Hint } from "@/components/common/hint";

interface WorkspaceSectionProps {
  label: string;
  hint: string;
  onNew?: () => void;
  children: React.ReactNode;
}

export const WorkspaceSection = ({ label, hint, onNew, children }: WorkspaceSectionProps) => {
  const [onToggle, setToggle] = useToggle(true);

  return (
    <div className="mt-3 flex flex-col px-2">
      <div className="group flex items-center px-3.5">
        <Button variant="ghost" className="size-6 shrink-0 text-sm" size="icon" onClick={setToggle}>
          <FaCaretDown className={cn("size-4 transition-transform", onToggle && "-rotate-90")} />
        </Button>
        <Button variant="ghost" size="sm" className="group h-[28px] justify-start overflow-hidden px-1.5 text-sm">
          <span className="truncate">{label}</span>
        </Button>

        {onNew && (
          <Hint label={hint} side="top" align="center">
            <Button
              variant="ghost"
              onClick={onNew}
              size="icon"
              className="ml-auto size-6 shrink-0 p-0.5 opacity-0 transition-opacity group-hover:opacity-100"
            >
              <PlusIcon className="size-5" />
            </Button>
          </Hint>
        )}
      </div>
      {onToggle && children}
    </div>
  );
};
