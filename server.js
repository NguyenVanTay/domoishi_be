/** @format */

import express from "express";
require("dotenv").config();
import cors from "cors";
import initRoutes from "./src/routers";
import connectDatabase from "./src/config/connectDB";
import generateCode from "./src/utils/generateCode";
require("dotenv").config();
const app = express();
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["POST", "GET", "PUT", "DELETE"],
  })
);

// cấu hình để có thể đọc được dữ liệu từ client gởi lên
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

initRoutes(app);
connectDatabase();
const port = process.env.PORT || 8888;
const listener = app.listen(port, () => {
  console.log(`Server is running on the port ${listener.address().port}`);
});
