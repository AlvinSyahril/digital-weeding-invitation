import type { Metadata } from "next";
import "./globals.css";
import data from '../data/invitation.json';

export const metadata: Metadata = {
  title: data.seo?.title || `${data.couple.bride.nickname} & ${data.couple.groom.nickname} | Wedding Invitation`,
  description: data.seo?.description || `Wedding Invitation of ${data.couple.bride.nickname} & ${data.couple.groom.nickname}`,
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
