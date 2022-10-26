import express from 'express';
import {get, order} from "../controllers/products"
const productRouter = express.Router();

productRouter.get("/all", get);
productRouter.post("/order", order);

export default productRouter