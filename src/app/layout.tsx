import type { Metadata } from "next";
import "./globals.css";
import { Lexend } from "next/font/google";

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
      <body className={`${font.className} text-color-primary antialiased`}>
        {children}
      </body>
    </html>
  );
}
