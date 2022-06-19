import express from "express";
import morgan from "morgan";
import nunjucks from "nunjucks";
import passport from "passport";
import dotenv from "dotenv";
import path from "path";
import session from "express-session";
import cookieParser from "cookie-parser";
import sessionStore from "express-session-sequelize";
import csrf from "csurf";
import nodemailer from "nodemailer";

import { sequelize } from "./models/index.js";
import passportConfig from "./passport/index.js";
import indexRoutes from "./routes/index.js";
import authRoutes from "./routes/auth.js";
import csrfRoutes from "./routes/csrf.js";
import * as errorController from "./controllers/errorController.js";

dotenv.config();
passportConfig();
const app = express();
const csrfProtection = csrf({ cookie: true });
const __dirname = path.resolve();
// const Store = sessionStore(session.Store);
// const sequelizeStore = new Store({
//   db: sequelize,
// });

app.set("port", 1000);
app.set("view engine", "html");
nunjucks.configure("views", {
  express: app,
  watch: true,
});
sequelize
  // .sync({ force: true })
  .sync()
  .then(() => console.log("sequelize connect"))
  .catch(err => console.error(err));

app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));
app.use("/images", express.static(path.join(__dirname, "images")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.SECRET));
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.SECRET,
  cookie: {
    httpOnly: true,
    secure: false,
  }
}));

app.use(passport.initialize());
app.use(passport.session());

// app.use(csrfProtection);

app.use("/", indexRoutes);
app.use("/auth", authRoutes);
app.use("/csrf", csrfRoutes);

app.use(errorController.error404);
app.use(errorController.error);

const server = app.listen(app.get("port"), () => {
  console.log(1000);
});