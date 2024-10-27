import type { Metadata } from "next";
import "./globals.css";

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
      <body className={`antialiased`}>{children}</body>
    </html>
  );
}
