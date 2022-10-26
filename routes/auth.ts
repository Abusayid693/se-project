import express from "express";
import { create, login, getSavedAddresses } from "../controllers/user";
import { protect } from "../middleware/auth";
const authRouter = express.Router();

authRouter.post("/create", create);
authRouter.post("/login", login);

authRouter.get("/getSavedAddresses", protect, getSavedAddresses);

export default authRouter;
