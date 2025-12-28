"use client"

import NavBar from "../components/NavBar";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        <NavBar />
        <main className="pl-[10px] pr-[10px]">
          {children}
        </main>
      </body>
    </html>
  );
}
