import { auth } from "@clerk/nextjs/server";

export default async function DashboardPage() {
  const { userId } = await auth();
  if (!userId) {
    // This route is protected by middleware; this is a safety check
    return null;
  }
  return (
    <main className="min-h-screen px-6 py-12">
      <h1 className="text-3xl font-semibold">Dashboard</h1>
      <p className="mt-2 text-slate-600 dark:text-slate-300">Welcome back.</p>
    </main>
  );
}
