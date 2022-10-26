import express from 'express';
import {get, order} from "../controllers/products"
import {protect} from "../middleware/auth"

const productRouter = express.Router();

productRouter.get("/all", get);
productRouter.post("/order", protect, order);

export default productRouter