import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import db from "@/lib/supabase/db";
import { ThemeProvider } from "@/lib/providers/next-theme-provider";
import { twMerge } from "tailwind-merge";
import { AppStateProvider } from "@/lib/providers/state-providers";
import { SupabaseUserProvider } from "@/lib/providers/supabase-user-provider";

const inter = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ideaFlow",
  description: "Organize your ideas and projects with ideaFlow.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  console.log(db);
  return (
    <html lang="en">
      <body className={twMerge("bg-background", inter.className)}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <AppStateProvider>
            <SupabaseUserProvider>{children}</SupabaseUserProvider>
          </AppStateProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
