import { Request, Response, NextFunction } from "express";
import db from "../../db.config";
import * as errorResponse from "../../utils/errorResponse";
import * as helpers from "./helpers";

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return next(
      new errorResponse.ErrorResponse("Required fields not provided", 400)
    );
  }
  try {
    await db.query(
      `Insert into dbms_project_user(username, email, password)
        values('${username}','${email}','${password}');
          `
    );
    res.status(200).json({
      success: true,
      data: "user successfully created",
    });
  } catch (error) {
    if (error?.errno === 1062) {
      res.status(404).json({
        success: false,
        errors: [
          {
            field: "email",
            message: "email already exist",
          },
        ],
      });
    }

    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(
      new errorResponse.ErrorResponse("Required fields not provided", 400)
    );
  }

  try {
    let user = await db.query(
      `select * from dbms_project_user where email='${email}'`
    );

    user = user?.[0];

    if (!user) {
      return res.status(401).json({
        success: false,
        errors: [
          {
            field: "email",
            message: "email not registered",
          },
        ],
      });
    }

    if (user.password !== password) {
      return res.status(401).json({
        success: false,
        errors: [
          {
            field: "password",
            message: "wrong password",
          },
        ],
      });
    }

    res.status(200).json({
      success: true,
      data: {
        user,
        token: helpers.getSignedToken(user.id),
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getSavedAddresses = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // @ts-ignore
  const userId = req.user.id;

  try {
    let result = await db.query(
      `select * from dbms_project_user_addresses where userId=${userId};`
    );

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const addNewAddress = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // @ts-ignore
  const userId = req.user.id;
  const { mobile_number, pin_code, city, state, landmark } = req.body;
  if (!mobile_number || !pin_code || !city || !state || !landmark) {
    new errorResponse.ErrorResponse("Required fields not provided", 400);
  }

  try {
    let result = await db.query(
      `Insert into dbms_project_user_addresses
      (userId, mobile_number, pin_code, city, state, landmark)
      values(${userId},'${mobile_number}','${pin_code}','${city}','${state}','${landmark}');`
    );

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
