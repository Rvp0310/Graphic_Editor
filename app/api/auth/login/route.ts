import { connectDB } from "@/app/lib/db";
import { NextResponse } from "next/server";
import { User } from "@/app/models/user";
import bcrypt from "bcryptjs";

export const POST = async (req: Request) => {
  try{
    await connectDB();

    const {username, password} = await req.json();

    if(!username || !password){
        return NextResponse.json(
            { message: "All Fields need to be filled" },
            { status: 400 }
        );
    }

    const existingUser = await User.findOne({ username });

    if (!existingUser) {
        return NextResponse.json({ error: "Username Not Registered" }, { status: 404 });
    }

    const isValid = await bcrypt.compare(password, existingUser.password);

    if(isValid){
        return NextResponse.json(
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
    } else {
        return NextResponse.json(
            { message: "Invalid Credentials" },
            { status: 401 }
        )
    }

  } catch(error) {
    console.error("Sign-up error: ", error);
    return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 }
    );
  }
}