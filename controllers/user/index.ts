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
      `Insert into se_project_user(username, email, password)
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
      `select * from se_project_user where email='${email}'`
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

export const me = async (req: Request, res: Response, next: NextFunction) => {
  // @ts-ignore
  const user = req.user;
  res.status(200).json({
    success: true,
    data: {
      user,
    },
  });
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
      `select * from se_project_user_addresses where userId=${userId};`
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
      `Insert into se_project_user_addresses
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

export const getPaymentMethods = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // @ts-ignore
  const userId = req.user.id;

  try {
    let result = await db.query(
      `select * from se_project_user_payment_methods where  userId='${userId}';`
    );

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const savePaymentMethod = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // @ts-ignore
  const userId = req.user.id;

  const { cvv, card, expiry } = req.body;
  if (!cvv || !card || !expiry) {
    new errorResponse.ErrorResponse("Required fields not provided", 400);
  }

  try {
    await db.query(`INSERT into se_project_user_payment_methods(
      userId, cvv, card, expiry
  ) values('${userId}','${cvv}','${card}','${expiry}');`);

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    next(error);
  }
};
