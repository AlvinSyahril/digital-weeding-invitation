import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aurelia & Julian | Wedding Invitation",
  description: "Elegant Botanical Blue Wedding Invitation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
