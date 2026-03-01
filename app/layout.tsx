import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Duke Street Ventures",
  description: "Traditional Investment Structures. Advanced Technology Platforms.",
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
