import express from "express";
import db from "./db.config";
import {errorHandler} from './middleware/error';
import cors from "cors"
// Routes
import authRouter from "./routes/auth"
import productRouter from "./routes/product"

db.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });
 
const app = express();
app.use(cors())
app.use(express.json());

app.use("/auth", authRouter);
app.use("/product", productRouter);

app.use(errorHandler);

const server = app.listen(4000, () => {
  console.log(`Timezones by location application is running on port ${4000}.`);
});

process.on("unhandledRejection", (error, promise) => {
  console.log(`[Error]: unhandled rejection Error : ${error}`);
  server.close(() => process.exit(1));
});

module.exports = server;
