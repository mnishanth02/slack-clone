import { ReactNode } from "react";
import { Toaster } from "@ui/sonner";
import NextTopLoader from "nextjs-toploader";

import { TooltipProvider } from "@/components/ui/tooltip";
import { Modals } from "@/components/common/modals";

export function ComponentProvider({ children }: { children: ReactNode }) {
  return (
    <TooltipProvider delayDuration={30}>
      <NextTopLoader color="#7c3aed" shadow="0 0 10px #7c3aed,0 0 5px #7c3aed" />
      <Modals />
      {children}
      <Toaster position="bottom-right" richColors duration={3000} toastOptions={{ style: { textAlign: "center" } }} />
    </TooltipProvider>
  );
}
