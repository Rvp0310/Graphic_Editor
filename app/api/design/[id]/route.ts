import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";
import { Design } from "@/app/models/design";
import { getUserFromToken } from "@/app/lib/auth";

export const GET = async (
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) => {
  try {
    await connectDB();

    const {id} = await context.params;

    const user = await getUserFromToken(req);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const design = await Design.findOne({
      _id: id,
      userId: user._id,
    });

    if (!design) {
      return NextResponse.json({ error: "Design not found" }, { status: 404 });
    }

    return NextResponse.json({ design }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch design" },
      { status: 500 }
    );
  }
};

export const PUT = async (
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) => {
  try{
    await connectDB();

    const {canvas, thumbnail}: {canvas: Object, thumbnail: string} = await req.json();

    const {id} = await context.params;
    const user = await getUserFromToken(req);

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const updateFields: any = {};

    if (canvas) updateFields.canvas = canvas;

    if (thumbnail) updateFields.thumbnail = thumbnail

    const updatedDesign = await Design.findOneAndUpdate({
        _id: id,
        userId: user._id
      },
      updateFields,
      {new: true}
    );

    if (!updatedDesign){
      return NextResponse.json(
        { error: "Design not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, design: updatedDesign },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { error: "Update failed" },
      { status: 500 }
    );
  }
}