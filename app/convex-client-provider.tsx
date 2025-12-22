/* eslint-disable node/no-process-env */
"use client";

import type { ReactNode } from "react";

import { ConvexProvider, ConvexReactClient } from "convex/react";

function createConvexClient() {
  const url = process.env.NEXT_PUBLIC_CONVEX_URL;

  if (!url) {
    throw new Error(
      "NEXT_PUBLIC_CONVEX_URL is not set. " +
        "Add it to Vercel Environment Variables.",
    );
  }

  return new ConvexReactClient(url);
}

export function ConvexClientProvider({ children }: { children: ReactNode }) {
  const convex = createConvexClient();

  return <ConvexProvider client={convex}>{children}</ConvexProvider>;
}
