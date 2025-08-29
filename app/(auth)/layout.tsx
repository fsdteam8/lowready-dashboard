import "../globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen items-center justify-center bg-gray-50">
      {children}
    </div>
  );
}
