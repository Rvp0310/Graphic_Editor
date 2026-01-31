import "server-only";

import { NextRequest } from "next/server";
import { verifyToken } from "./authMiddleware";
import { User } from "../models/user";
import { connectDB } from "./db";

export const getUserFromToken = async (req: NextRequest) => {
  try{
    await connectDB();
    
    const payload: any = verifyToken(req as any);
    const currUser = await User.findById(payload.id);

    if(!currUser){
      throw new Error("No User Exist");
    }

    return currUser;
  }
  catch{
    throw new Error("Unauthorized");
  }
}