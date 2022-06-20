import { Op } from "sequelize";
import bcrypt from "bcrypt";

import User from "../models/user.js";

const pageIndex = async (req, res, next) => {
  return res.render("index");
}

const pageSuccess = async (req, res, next) => {
  return res.send("success");
}

const pageProfile = async (req, res, next) => {
  console.log(req.user);
  return res.send("profile");
}

const pageReset = async (req, res, next) => {
  return res.render("reset");
}

const pageReset2 = async (req, res, next) => {
  try {
    const link = req.params.link;
    console.log(link);
    const user = await User.findOne({ where: { 
      resetToken: link,
      resetTokenExpiration: { [Op.gt]: Date.now() },
    }});
    const userId = JSON.stringify(user);
    const result = JSON.parse(userId);
    if (!user) return res.redirect("/?error=토큰 기간 만료");
    return res.render("resetpassword", {
      userId: result.id,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
}

const pageCsrf = async (req, res, next) => {
  return res.render("csrf", {
    csrfToken: req.csrfToken(),
  });
}

export {
  pageIndex,
  pageSuccess,
  pageProfile,
  pageReset,
  pageReset2,
  pageCsrf,
}