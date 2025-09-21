"use client";
import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <SignUp routing="path" path="/sign-up" signInUrl="/sign-in" />
    </main>
  );
}
