/** @format */

import express from "express";
import * as controllers from "../controllers/areas";
const router = express.Router();

router.get("/all", controllers.getAreasController);

export default router;
