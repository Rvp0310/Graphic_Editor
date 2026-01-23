import { NextRequest } from "next/server";
import { verifyToken } from "./authMiddleware";
import { User } from "../models/user";

export const isStrongPassword = (password: string) => {
    return password.length >= 8;
  };

export  const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const getUserFromToken = async (req: NextRequest) => {
  try{
    const decoded = verifyToken(req);
    const {userId} = decoded as {userId: string};
    const currUser = await User.findById(userId);

    if(!currUser){
      throw new Error("No User Exist");
    }

    return currUser;
  }
  catch{
    throw new Error("Unauthorized");
  }
}