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
        <main className="mt-[70px] pl-[10px] pr-[10px]">
          {children}
        </main>
      </body>
    </html>
  );
}
