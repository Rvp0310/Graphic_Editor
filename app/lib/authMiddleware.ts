import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "pokemon";

export const verifyToken = (req: NextRequest) => {
    const token = req.cookies.get("token")?.value;

    if(!token)
        throw new Error("No Token");

    try {
        const payload = jwt.verify(token, JWT_SECRET);
        return payload;
    } catch {
        throw new Error("Invalid token");
    }
}