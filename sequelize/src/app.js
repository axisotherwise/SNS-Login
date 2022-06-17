import express from "express";
import nunjucks from "nunjucks";
import passport from "passport";
import dotenv from "dotenv";
import path from "path";
import session from "express-session";
import cookieParser from "cookie-parser";

import { sequelize } from "./models/index.js";
import passportConfig from "./passport/index.js";
import indexRoutes from "./routes/index.js";
import authRoutes from "./routes/auth.js";
import * as errorController from "./controllers/errorController.js";

dotenv.config();
passportConfig();
const app = express();
const __dirname = path.resolve();

app.set("port", 1000);
app.set("view engine", "html");
nunjucks.configure("views", {
  express: app,
  watch: true,
});
app.set("user", {
  name: "윤승근",
  age: 29,
  married: false,
}); 

sequelize
  // .sync({ force: true })
  .sync()
  .then(() => console.log("sequelize connect"))
  .catch(err => console.error(err));

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

app.use("/", indexRoutes);
app.use("/auth", authRoutes);

app.use((req, res, next) => {
  const error = new Error(`${req.url} ${req.method} 존재하지 않습니다.`);
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = err;
  res.status(500).render("error");
});

// app.use(errorController.error404);
// app.use(errorController.error);

const server = app.listen(app.get("port"), () => {
  console.log(1000);
});