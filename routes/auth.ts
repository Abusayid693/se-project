import express from "express";
import {
  create,
  login,
  getSavedAddresses,
  me,
  addNewAddress,
  getPaymentMethods,
  savePaymentMethod,
} from "../controllers/user";
import { protect } from "../middleware/auth";
const authRouter = express.Router();

authRouter.post("/create", create);
authRouter.post("/login", login);

authRouter.get("/getSavedAddresses", protect, getSavedAddresses);
authRouter.post("/addNewAddress", protect, addNewAddress);

authRouter.get("/me", protect, me);
authRouter.get("/payments", protect, getPaymentMethods);
authRouter.post("/addPayment", protect, savePaymentMethod);

export default authRouter;
