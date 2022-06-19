import passport from "passport";
import bcrypt, { compareSync } from "bcrypt";
import crypto from "crypto";
import nodemailer from "nodemailer";

import { sequelize } from "../models/index.js"; 
import User from "../models/user.js";
import Info from "../models/info.js";
import { token } from "morgan";

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
  res.redirect("/");
}

const logout = async (req, res, next) => {
  try {
    req.logout((err) => {
      if (err) {
        console.error(err);
        next(err);
      }
      req.session.destroy((err) => {
        if (err) {
          console.error(err);
          next(err);
        }
        return res.redirect("/");
      });
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
}

const reset = async (req, res, next) => {
  try {
    const link = await crypto.randomBytes(32).toString("hex");
    const user = await User.findOne({ where: { email: req.body.email }});
    if (!user) return res.redirect("/")
    const update = await user.update({
      resetToken: link,
      resetTokenExpiration: Date.now() + 300000,
    });
    if (!update) return res.redirect("/?error=업데이트 실패");
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "thelapssql@gmail.com",
          pass: process.env.PW,
        },
      });
      const details = {
        from: "thelapssql@gmail.com",
        to: `${req.body.email}`,
        subject: "reset",
        text: `
          <p>Request a password reset</p>
          <p>Click this <a href="http://localhost:1000/reset/${link}">link</a> to set a new Password.</p>
        `,
      };
      transporter.sendMail(details, (err) => {
        if (err) return console.error(err);
        console.log("success send");
        return res.redirect("/");
      });
  } catch (err) {
    console.error(err);
    next(err);
  }
} 

const update = async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { id: req.body.userid }});
    if (!user) return res.redirect("/?error=유저 없음");
    const hash = await bcrypt.hash(req.body.password, 12);
    const update = await user.update({
      password: hash,
      resetToken: null,
      resetTokenExpiration: null,
    });
    res.redirect("/");
  } catch (err) {
    console.error(err);
    next(err);
  }
}

const KLogin = (req, res, next) => {
  passport.authenticate("kakao")(req, res, next);
}

export {
  join,
  login,
  logout,
  reset,
  update,
  KLogin,
}