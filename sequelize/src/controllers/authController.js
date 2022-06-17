import passport from "passport";
import bcrypt from "bcrypt";

import { sequelize } from "../models/index.js"; 
import User from "../models/user.js";
import Info from "../models/info.js";

const join = async (req, res, next) => {
  const t = sequelize.transaction();
  try {
    await sequelize.transaction(async (t) => {
      const user = await User.create({
        name: "user",
        password: "password",
      }, { transaction: t });
      const userInfo = await Info.create({
        gender: "여자",
        UserId: user.id,
      }, { transaction: t });
      return res.status(201).json({
        user,
        userInfo,
      });
    });
  } catch (err) {
    console.error(err);
  }

  // try {
  //   const t = await sequelize.transaction();
  //   const { name, password } = req.body;
  //   const user = await User.create({
  //     name,
  //     password,
  //   }, { transaction: t });
  //   throw "error occurred";
  //   const userInfo = await Info.create({
  //     gender: "남자",
  //     UserId: user.id,
  //   }, { transaction: t });
  //   t.commit();
  //   return res.status(201).json({
  //     user,
  //     userInfo,
  //   });
  // } catch (err) {
  //   t.rollback();
  //   console.error(err);
  //   return next(err);
  // }
}

const login = async (req, res, next) => {
  res.cookie("cookieName", "userCookie");
  res.redirect("/");
}

const KLogin = (req, res, next) => {
  passport.authenticate("kakao")(req, res, next);
}

const KCallBack = (req , res, next) => {
  passport.authenticate("kakao", {
    failureRedirect: "/",
  }), (req, res, next) => {
    return res.redirect("/success");
  };
}

export {
  join,
  login,
  KLogin,
  KCallBack,
}