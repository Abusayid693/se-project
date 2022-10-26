import express from 'express';
import {create, login} from "../controllers/user"
const authRouter = express.Router();

authRouter.post("/create", create)
authRouter.post("/login", login)

export default authRouter