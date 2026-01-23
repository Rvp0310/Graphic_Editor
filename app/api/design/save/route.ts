import { NextRequest, NextResponse } from "next/server";
import { Design } from "@/app/models/design";
import { connectDB } from "@/app/lib/db"; 
import { getUserFromToken } from "@/app/lib/auth";
import { Canvas } from "fabric";

export const POST = async (req: NextRequest) => {
    try{
        await connectDB();

        const user = await getUserFromToken(req);

        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const {name, canvas, thumbnail}: {name: string, canvas: Canvas, thumbnail: string} = await req.json()

        const design = await Design.create({
            userId: user._id,
            name,
            canvas,
            thumbnail
        });
    } catch {
        return NextResponse.json({ error: 'Save failed' }, { status: 500 });
    }
}