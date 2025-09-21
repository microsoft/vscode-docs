"use client";

import { ReactNode, useEffect } from "react";
import { ClerkProvider } from "@clerk/nextjs";
import posthog from "posthog-js";

export default function Providers({ children }: { children: ReactNode }) {
  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_POSTHOG_KEY as string | undefined;
    if (!key) return;
    posthog.init(key, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com",
    });
  }, []);

  const clerkPk = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY as string | undefined;
  if (!clerkPk) {
    return <>{children}</>;
  }
  return (
    <ClerkProvider publishableKey={clerkPk} signInUrl="/sign-in" signUpUrl="/sign-up">
      {children}
    </ClerkProvider>
  );
}
