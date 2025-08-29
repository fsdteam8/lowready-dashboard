import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/providers/query-provider";
import { Sidebar } from "@/components/sidebar";
import { Header } from "@/components/header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AlhHub Dashboard",
  description: "Dashboard for AlhHub",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <QueryProvider>
          <div className="flex h-screen bg-gray-50">
            <Sidebar />

            <main className="flex-1 overflow-y-auto p-6">
              {" "}
              <Header
                title="Dashboard"
                subtitle="Welcome back! Here's what's happening with your app today."
              />
              {children}
            </main>
          </div>
        </QueryProvider>
      </body>
    </html>
  );
}
