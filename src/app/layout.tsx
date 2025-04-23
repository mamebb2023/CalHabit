import type { Metadata } from "next";
import "./globals.css";
import { Lexend } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
// import { AuroraBackground } from "@/components/ui/aurora-background";
import { UserProvider } from "@/context/UserContext";

const font = Lexend({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CalHabit | Track my habits",
  description: "A website to track my habits",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
          rel="stylesheet"
        />
      </head>
      <body className={`${font.className} antialiased bg-black text-white`}>
        <UserProvider>
          <div className="-z-1 absolute inset-0 w-full h-full overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute top-10 right-10 size-40 rounded-full bg-blue-900/50 blur-xl animate-float1"></div>
            <div className="absolute bottom-10 left-10 size-40 rounded-full bg-purple-900/50 blur-xl animate-float2"></div>
            <div className="absolute top-1/3 left-1/4 size-60 rounded-full bg-indigo-900/30 blur-3xl animate-float3"></div>
            <div className="absolute bottom-1/4 right-1/3 size-32 rounded-full bg-pink-900/40 blur-xl animate-float4"></div>
          </div>

          {/* Content */}
          <div className="relative h-screen w-screen overflow-y-auto z-10">
            {children}
          </div>
          <Toaster />
        </UserProvider>
      </body>
    </html>
  );
}
