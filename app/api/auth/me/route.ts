import {NextRequest, NextResponse} from "next/server";
import {verifyToken} from "@/app/lib/authMiddleware";
import { User } from "@/app/models/user";
import { connectDB } from "@/app/lib/db";

export const GET = async (req: Request) => {
    try {
        await connectDB();
    
        const payload: any = verifyToken(req as any);
        const user = await User.findById(payload.id).select("-password");
        
        return NextResponse.json({ user });
    } catch {
        return NextResponse.json({ user: null });
    }
}