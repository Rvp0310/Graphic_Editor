import { connectDB } from "@/app/lib/db";
import { NextResponse } from "next/server";
import { User } from "@/app/models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "pokemon";


export const POST = async (req: Request) => {
  try{
    await connectDB();

    const {username, password} = await req.json();

    if(!username || !password){
        return NextResponse.json(
            { message: "All Fields required" },
            { status: 400 }
        );
    }

    const existingUser = await User.findOne({ username });

    if (!existingUser) {
        return NextResponse.json({ error: "Username Not Registered" }, { status: 404 });
    }

    const isValid = await bcrypt.compare(password, existingUser.password);

    if(!isValid){
        return NextResponse.json(
            { message: "Invalid Credentials" },
            { status: 401 }
        )
    }

    const token = jwt.sign({id: existingUser._id, username: existingUser.username}, JWT_SECRET, {expiresIn: "1d"})

    const res = NextResponse.json(
        {
            message: "User Logged-in Successfully",
            user: {
                id: existingUser._id,
                username: existingUser.username,
                email: existingUser.email
            }
        },
        { status: 200 }
    );

    res.cookies.set({
        name: "token",
        value: token,
        httpOnly: true,
        path: "/",
        maxAge: 60 * 60 * 24,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production"
    });

    return res;

  } catch(error) {
    console.error("Login error: ", error);
    return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 }
    );
  }
}