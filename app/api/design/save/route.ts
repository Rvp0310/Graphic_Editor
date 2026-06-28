import { NextRequest, NextResponse } from "next/server";
import { Design } from "@/app/models/design";
import { connectDB } from "@/app/lib/db"; 
import { getUserFromToken } from "@/app/lib/auth";

export const POST = async (req: NextRequest) => {
    try{
        await connectDB();

        const {userId, name, type, content, thumbnail}: {userId: string, name: string, type: string, content: Object, thumbnail: string} = await req.json()
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
            type,
            content,
            thumbnail
        });

        return NextResponse.json({ success: true, design }, { status: 201 });
    } catch {
        return NextResponse.json({ error: 'Save failed' }, { status: 500 });
    }
}

export const GET = async (req: NextRequest) => {
    try{
        console.log("here")
        await connectDB();
        console.log("Fetching user...");
        const user = await getUserFromToken(req);

        console.log(user);
        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        
        const designs = await Design.find({userId: user._id}).select("name type thumbnail updatedAt").sort({ updatedAt: -1 });
        console.log(designs);
        return NextResponse.json({ designs }, { status: 200 });
    } catch (err) {
        return NextResponse.json(
        { error: "Failed to fetch designs" },
        { status: 500 }
        );
    }
}

export const DELETE = async (req: NextRequest) => {
    try{
        await connectDB();

        const {designId}: { designId: string} = await req.json();

        const design = await Design.findOneAndDelete({_id: designId});

        if (!design) {
            return NextResponse.json(
                { error: "Design not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, design }, { status: 200 });
    } catch {
        return NextResponse.json(
        { error: "Failed to Delete The Design" },
        { status: 500 }
        );
    }
}

export const PUT = async (req: NextRequest) => {
    try{
        await connectDB();

        const {designId, name}: { designId: string, name: string} = await req.json();

        const design = await Design.findOneAndUpdate({_id: designId}, {name});

        if (!design) {
            return NextResponse.json(
                { error: "Design not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, design }, { status: 200 });
    } catch {
        return NextResponse.json(
        { error: "Failed to Rename The Design" },
        { status: 500 }
        );
    }
}