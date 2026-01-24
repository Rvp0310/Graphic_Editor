"use client"

import DesignSpace from "@/app/components/DesignSpace";
import FileTypes from "../../components/FileTypes";
import { useAuth } from "@/app/context/AuthContext";

export default function Home() {
  const {user} = useAuth();

  return (
    <>
      <FileTypes/>
      <div className="tapered-line"></div>
      <div className="h-full flex flex-col items-center justify-center">
        {user ? <DesignSpace user={user}/> : <p className="text-sm phrase">Saved files are available here after login</p>}
      </div>
    </>
  );
}