import type { Metadata } from "next";
import "./globals.css";
import { Lexend } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import { AuroraBackground } from "@/components/ui/aurora-background";
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
      <body className={`${font.className} antialiased `}>
        <UserProvider>
          <AuroraBackground className="text-white bg-black">
            <div className="h-screen w-screen overflow-y-scroll z-10">
              {children}
            </div>
          </AuroraBackground>
          <Toaster />
        </UserProvider>
      </body>
    </html>
  );
}
