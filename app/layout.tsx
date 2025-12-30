import type { Metadata } from "next";
import "@/app/globals.css";  // how tf is this not found but is executing alright
import { AuthProvider } from "./context/AuthContext";

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
          <AuthProvider>
            {children}
          </AuthProvider>
      </body>
    </html>
  );
}
