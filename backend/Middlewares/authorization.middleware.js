import { asyncHandler } from "../Utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { User } from "../Models/User.model.js";

export const verifyJWT = asyncHandler(async (req, _, next) => {
  try {
    const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new Error("Unauthorized request");
    }

    const decodedToken = jwt.verify(token, "asim2005");

    const user = await User.findById(decodedToken?._id).select("-password");

    if (!user) {
      throw new Error("Invalid token");
    }

    req.user = user;
    next();
  } catch (error) {
    throw new Error(`Error verifying JWT: ${error.message}`);
  }
});