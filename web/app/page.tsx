"use client";
import Link from "next/link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export default function Page() {
  const hasClerk = Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="p-8 rounded-lg shadow bg-white/90 dark:bg-[#0F172A]">
        <div className="flex items-center justify-between gap-8">
          <div>
            <h1 className="text-2xl font-semibold">LifeMtrics</h1>
            <p className="text-slate-500 dark:text-slate-300">Smooth UI • Live updates • Secure</p>
          </div>
          <div className="flex items-center gap-4">
            {hasClerk ? (
              <>
                <SignedOut>
                  <Link href="/sign-in" className="underline">Sign in</Link>
                  <Link href="/sign-up" className="underline">Sign up</Link>
                </SignedOut>
                <SignedIn>
                  <Link href="/dashboard" className="underline">Dashboard</Link>
                  <UserButton afterSignOutUrl="/" />
                </SignedIn>
              </>
            ) : (
              <>
                <Link href="/sign-in" className="underline">Sign in</Link>
                <Link href="/sign-up" className="underline">Sign up</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
