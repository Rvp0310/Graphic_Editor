import { NextRequest, NextResponse } from "next/server";
import { Design } from "@/app/models/design";
import { connectDB } from "@/app/lib/db"; 
import { getUserFromToken } from "@/app/lib/auth";
import { UserType } from "@/app/context/AuthContext";

export const POST = async (req: NextRequest) => {
    try{
        await connectDB();

        const {userId, name, canvas, thumbnail}: {userId: string, name: string, canvas: Object, thumbnail: string} = await req.json()
        const existing = await Design.find({
            userId,
            name: { $regex: `^${name}( \\(\\d+\\))?$` }
        });

        const finalName = existing.length === 0 ? name : `${name} (${existing.length})`;

        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const design = await Design.create({
            userId,
            name: finalName,
            canvas,
            thumbnail
        });

        return NextResponse.json({ success: true, design }, { status: 201 });
    } catch {
        return NextResponse.json({ error: 'Save failed' }, { status: 500 });
    }
}

export const GET = async (req: NextRequest) => {
    try{
        await connectDB();

        const user = await getUserFromToken(req);

        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        
        const designs = await Design.find({userId: user._id}).select("name thumbnail updatedAt").sort({ updatedAt: -1 });
        
        return NextResponse.json({ designs }, { status: 200 });
    } catch (err) {
        return NextResponse.json(
        { error: "Failed to fetch designs" },
        { status: 500 }
        );
    }
}