import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import NavBar from "../components/NavBar";

const ProtectedLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if(!token){
        redirect('/login');
    }

    try {
        jwt.verify(token, process.env.JWT_SECRET!);
    } catch {
        redirect('/login');
    }

  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        <NavBar />
        <main className="mt-[70px] pl-[10px] pr-[10px] main">
          {children}
        </main>
      </body>
    </html>
  );
}

export default ProtectedLayout;