import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

import ConditionalNavbar from "@/components/ConditionalNavbar";
import ConditionalFooter from "@/components/CondtionalFooter";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FixMate",
  description: "FixMate Repair Service Platform",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
  <ConditionalNavbar />

  <main className="flex-1">
    {children}
  </main>

    <ConditionalFooter></ConditionalFooter>

  <Toaster position="top-right" richColors />
</body>
    </html>
  );
}