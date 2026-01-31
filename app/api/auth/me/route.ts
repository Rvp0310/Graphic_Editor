import {NextRequest, NextResponse} from "next/server";
import {verifyToken} from "@/app/lib/authMiddleware";
import { User } from "@/app/models/user";
import { connectDB } from "@/app/lib/db";

export const GET = async (req: Request) => {
    try {
        await connectDB();
    
        const payload: any = verifyToken(req as any);

        if (!payload?.id) {
            return NextResponse.json(
                { user: null },
                { status: 401 }
            );
        }
        
        const user = await User.findById(payload.id).select("-password");

        if (!user) {
            return NextResponse.json(
                { user: null },
                { status: 401 }
            );
        }
        
        return NextResponse.json({ user });
    } catch {
        return NextResponse.json(
            { user: null },
            { status: 401 }
        );
    }
}