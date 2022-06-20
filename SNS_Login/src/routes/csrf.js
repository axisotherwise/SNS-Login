import express from "express";

import * as indexController from "../controllers/indexController.js";
import * as csrfController from "../controllers/csrf.js";

const router = express.Router();

router.route("/")
  .get(indexController.pageCsrf)
  .post((req, res, next) => {
    res.send("success");
  });

export default router;