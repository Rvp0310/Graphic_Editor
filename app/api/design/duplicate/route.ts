import { NextRequest, NextResponse } from "next/server";
import { Design } from "@/app/models/design";
import { connectDB } from "@/app/lib/db";
import { getUserFromToken } from "@/app/lib/auth";

export const POST = async (req: NextRequest) => {
  try {
    await connectDB();

    const user = await getUserFromToken(req);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { designId } = await req.json();

    const original = await Design.findOne({
      _id: designId,
      userId: user._id,
    });

    if (!original) {
      return NextResponse.json({ error: "Design not found" }, { status: 404 });
    }

    const existing = await Design.find({
      userId: user._id,
      name: { $regex: `^${original.name}( \\(\\d+\\))?$` },
    });

    const finalName =
      existing.length === 0
        ? original.name
        : `${original.name} (${existing.length})`;

    const duplicated = await Design.create({
      userId: user._id,
      name: finalName,
      canvas: original.canvas,
      thumbnail: original.thumbnail,
    });

    return NextResponse.json({ success: true, design: duplicated }, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to duplicate design" },
      { status: 500 }
    );
  }
};
