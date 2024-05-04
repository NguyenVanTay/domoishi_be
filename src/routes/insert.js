/** @format */

import express from "express";
import * as insertController from "../controllers/insert";
const router = express.Router();

router.post("/", insertController.insertController);

export default router;
