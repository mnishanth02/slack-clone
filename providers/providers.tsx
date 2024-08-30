"use client";

import { ReactNode } from "react";
import { ThemeProvider } from "@common/theme-provider";
import { ConvexAuthNextjsProvider } from "@convex-dev/auth/nextjs";
import { Toaster } from "@ui/sonner";
import { TooltipProvider } from "@ui/tooltip";
import { ConvexReactClient } from "convex/react";
import NextTopLoader from "nextjs-toploader";

import { env } from "@/env";
import QueryProvider from "./QueryProvider";

const convex = new ConvexReactClient(env.NEXT_PUBLIC_CONVEX_URL as string);

export function Providers({ children }: { children: ReactNode }) {
  return (
    <QueryProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        <NextTopLoader color="#15803d" shadow="0 0 10px #15803d,0 0 5px #15803d" />
        <TooltipProvider delayDuration={0}>
          <ConvexAuthNextjsProvider client={convex}>{children}</ConvexAuthNextjsProvider>
        </TooltipProvider>
        <Toaster position="bottom-right" richColors duration={3000} toastOptions={{ style: { textAlign: "center" } }} />
      </ThemeProvider>
    </QueryProvider>
  );
}
