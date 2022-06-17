import bcrypt from "bcrypt";

import User from "../models/user.js";

const pageIndex = async (req, res, next) => {
  return res.render("index");
}

const pageSuccess = async (req, res, next) => {
  return res.send("success");
}

export {
  pageIndex,
  pageSuccess,
}