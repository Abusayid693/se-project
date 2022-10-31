import express from "express";
import {
  get,
  order,
  orderedItems,
  addProductToCart,
  removeProductFromCart,
  getProductsFromCart,
  getOrderDetails,
  getOrderedItemDetails
} from "../controllers/products";
import { protect } from "../middleware/auth";

const productRouter = express.Router();

productRouter.get("/all", get);
productRouter.post("/order", protect, order);

productRouter.get("/orderedItems", protect, orderedItems);

productRouter.post("/getOrderedItemDetails", protect, getOrderedItemDetails);

productRouter.post("/getOrderDetails", protect, getOrderDetails);

productRouter.post("/addProductToCart", protect, addProductToCart);
productRouter.post("/removeProductFromCart", protect, removeProductFromCart);
productRouter.get("/getProductsFromCart", protect, getProductsFromCart);

export default productRouter;
