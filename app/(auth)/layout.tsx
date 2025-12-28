import React from 'react'

import Link from "next/link";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="authBody">
      <Link href="/home"><img className='toHome' src="/graphic_editor.png" alt="BackToHome"/></Link>
        {children}
    </main>
  );
}

