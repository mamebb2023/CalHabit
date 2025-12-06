import type { Metadata } from "next";
import "./globals.css";
import { Lexend } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import { UserProvider } from "@/context/UserContext";

const font = Lexend({ subsets: ["latin"], variable: "--font-lexend" });

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
      <body
        className={`${font.className} ${font.variable} antialiased overflow-x-hidden bg-white text-gray-900`}
      >
        <UserProvider>
          <div className="min-h-screen bg-white">{children}</div>
          <Toaster />
        </UserProvider>
      </body>
    </html>
  );
}
