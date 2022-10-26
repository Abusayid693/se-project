import express from 'express';
import {get, order, orderedItems} from "../controllers/products"
import {protect} from "../middleware/auth"

const productRouter = express.Router();

productRouter.get("/all", get);
productRouter.post("/order", protect, order);

productRouter.get("/orderedItems", protect, orderedItems);

export default productRouter