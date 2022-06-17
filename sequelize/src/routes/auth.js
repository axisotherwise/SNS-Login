import express from "express";
import passport from "passport";

import * as authController from "../controllers/authController.js";

const router = express.Router();

router.post("/join", authController.join);
router.post("/login", authController.login);

router.get("/kakao/callback", passport.authenticate("kakao", {
  failureRedirect: "/",
}), (req, res) => {
  res.redirect("/");
});
router.post("/kakao/:kind", (req, res, next) => {
  const kind = req.params.kind;
  switch (kind) {
    case "kakao":
      passport.authenticate("kakao")(req, res, next);
      break;
    default:
      console.log("나머지 입니다.");
  }
});

export default router;
