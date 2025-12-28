import type { Metadata } from "next";
import "./globals.css";  // how tf is this not found but is executing alright

export const metadata: Metadata = {
  title: "Graphic_Editor",
  description: "A Tool Inspired By Canva",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
