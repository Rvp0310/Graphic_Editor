import { NextResponse } from "next/server";

export const POST = () => {
    const res = NextResponse.json({message: "Logged Out"});
    res.cookies.set({
        name: "token",
        value: "",
        httpOnly: true,
        path: "/",
        maxAge: 0
    });
  return res;
}