"use client";

import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

interface HintProps {
  label: string;
  children: React.ReactNode;
  side?: "top" | "bottom" | "left" | "right";
  align?: "start" | "center" | "end";
}

export const Hint = ({ children, label, side = "top", align = "center" }: HintProps) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent side={side} align={align}>
        <p className="text-xs font-medium">{label}</p>
      </TooltipContent>
    </Tooltip>
  );
};
