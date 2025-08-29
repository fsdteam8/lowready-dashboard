import Image from "next/image";
import "../globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-gray-50">
      <div className="container mx-auto">
        <Image
          src="/logo.png"
          alt="Login background"
          width={800}
          height={800}
          className="h-[120px] w-[250px] object-contain"
        />
      </div>
      <div className="flex h-[calc(100vh-120px)] container mx-auto items-center justify-center font-poppins">
        {children}
      </div>
    </div>
  );
}
