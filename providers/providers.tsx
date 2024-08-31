"use client";

import { ReactNode } from "react";
import { ThemeProvider } from "@common/theme-provider";
import { ConvexAuthNextjsProvider } from "@convex-dev/auth/nextjs";
import { ConvexReactClient } from "convex/react";

import { env } from "@/env";
import { ComponentProvider } from "./component-provider";
import QueryProvider from "./QueryProvider";

const convex = new ConvexReactClient(env.NEXT_PUBLIC_CONVEX_URL as string);

export function Providers({ children }: { children: ReactNode }) {
  return (
    <QueryProvider client={convex}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        <ConvexAuthNextjsProvider client={convex}>
          <ComponentProvider>{children}</ComponentProvider>
        </ConvexAuthNextjsProvider>
      </ThemeProvider>
    </QueryProvider>
  );
}
