import express from "express";
import db from "./db.config";


db.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });
 
const app = express();

app.use(express.json());

app.get("/", (req, res) => res.send("Server is running successfully"));

app.get("/test", async (req, res) => {
    const result = await db.query(
        `select * from dbms_project_user;
          `
      );

      console.log('result :', result)
});

const server = app.listen(4000, () => {
  console.log(`Timezones by location application is running on port ${4000}.`);
});

process.on("unhandledRejection", (error, promise) => {
  console.log(`[Error]: unhandled rejection Error : ${error}`);
  server.close(() => process.exit(1));
});

module.exports = server;
