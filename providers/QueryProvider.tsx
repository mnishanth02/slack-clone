"use client";

// We can not useState or useRef in a server component, which is why we are
// extracting this part out into it's own file with 'use client' on top
import { useState } from "react";
import { ConvexQueryClient } from "@convex-dev/react-query";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ConvexProvider, ConvexReactClient } from "convex/react";

function makeQueryClient(convexQueryClient: ConvexQueryClient) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        queryKeyHashFn: convexQueryClient.hashFn(),
        queryFn: convexQueryClient.queryFn(),
        // With SSR, we usually want to set some default staleTime
        // above 0 to avoid refetching immediately on the client
        // staleTime: 60 * 1000,
      },
    },
  });
  convexQueryClient.connect(queryClient);

  return queryClient;
}

let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient(convexQueryClient: ConvexQueryClient) {
  if (typeof window === "undefined") {
    // Server: always make a new query client
    return makeQueryClient(convexQueryClient);
  } else {
    // Browser: make a new query client if we don't already have one
    // This is very important so we don't re-make a new client if React
    // suspends during the initial render. This may not be needed if we
    // have a suspense boundary BELOW the creation of the query client
    if (!browserQueryClient) browserQueryClient = makeQueryClient(convexQueryClient);
    return browserQueryClient;
  }
}

export default function QueryProvider({ children, client }: { children: React.ReactNode; client: ConvexReactClient }) {
  // NOTE: Avoid useState when initializing the query client if you don't
  //       have a suspense boundary between this and the code that may
  //       suspend because React will throw away the client on the initial
  //       render if it suspends and there is no boundary
  const convexQueryClient = new ConvexQueryClient(client);
  const [queryClient] = useState(getQueryClient(convexQueryClient));

  return (
    <ConvexProvider client={client}>
      <QueryClientProvider client={queryClient}>
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ConvexProvider>
  );
}
