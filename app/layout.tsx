import type { Metadata } from "next";
import "./globals.css";
import data from '../data/invitation.json';

export const metadata: Metadata = {
  title: data.seo?.title || `${data.bride.name} & ${data.groom.name} | Wedding Invitation`,
  description: data.seo?.description || `Wedding Invitation of ${data.bride.name} & ${data.groom.name}`,
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
