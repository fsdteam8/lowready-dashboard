import "../globals.css";
import { Sidebar } from "@/components/sidebar";
import { Header } from "@/components/header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      <main className="flex-1 overflow-y-auto p-6">
        <Header
          title="Dashboard"
          subtitle="Welcome back! Here's what's happening with your app today."
        />
        {children}
      </main>
    </div>
  );
}
