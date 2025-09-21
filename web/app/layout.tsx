import "./globals.css";
import type { ReactNode } from "react";
import Providers from "./providers";

export const metadata = { title: "LifeMtrics", description: "Modern, smooth UI" };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-slate-900 dark:bg-[#0F172A] dark:text-slate-100">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
