import express from "express";

import * as indexController from "../controllers/indexController.js";

const router = express.Router();

router.get("/", indexController.pageIndex);
router.get("/success", indexController.pageSuccess);
router.get("/profile", indexController.pageProfile);
router.get("/reset", indexController.pageReset);
router.get("/reset/:link", indexController.pageReset2);

export default router;