import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import db from "../db.config";
import { ErrorResponse } from "../utils/errorResponse";
import { JWT_SECRET } from "../env";

export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    // eg:  Bearer evifheiuhgurih....
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return next(new ErrorResponse("Unauthorized request", 401));
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    console.log("decoded :", decoded);
    let user = await db.query(
      `select * from se_project_user where id=${decoded?.id};`
    );
    user = user?.[0];
    if (!user) {
      return next(new ErrorResponse("User not found", 404));
    }
    // @ts-ignore
    req.user = user;

    next();
  } catch (error) {
    return next(new ErrorResponse("Unauthorized request", 401));
  }
};
