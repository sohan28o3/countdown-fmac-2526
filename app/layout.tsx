import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FMAC Countdown",
  description: "Filmmaking Club countdown to April 21, 10 PM local time"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}