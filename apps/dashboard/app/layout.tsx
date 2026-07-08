import type { Metadata } from "next";
import { Syne, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import TopBar from "./_components/topbar";
import { cn } from "@/lib/utils";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "genesis.bot",
  description: "100% português. 100% open source.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", "dark", syne.variable, jetbrainsMono.variable)}
    >
      <body className="min-h-full flex flex-col">
        <TopBar />
        <main className="mt-20">{children}</main>
      </body>
    </html>
  );
}
