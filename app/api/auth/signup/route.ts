import { connectDB } from "@/app/lib/db";
import { NextResponse } from "next/server";
import { User } from "@/app/models/user";
import bcrypt from "bcryptjs";

export const POST = async (req: Request) => {
  try{
    await connectDB();

    const {username, email, password} = await req.json();

    if(!username || !email || !password){
        return NextResponse.json(
            { message: "All Fields need to be filled" },
            { status: 400 }
        );
    }

    const existingUser = await User.findOne({ username });

    if (existingUser) {
        return NextResponse.json({ error: "Username Already Exists" }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({username, email, password: hashedPassword, files: []});

    return NextResponse.json(
        { message: "User created successfully" },
        { status: 201 }
    );
  } catch(error) {
    console.error("Sign-up error: ", error);
    return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 }
    );
  }
}