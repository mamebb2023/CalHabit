import type { Metadata } from "next";
import "./globals.css";
import { Lexend } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";

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
      <body className={`${font.className} text-color-primary antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
