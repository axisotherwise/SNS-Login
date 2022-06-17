import passport from "passport";
import Strategy from "passport-kakao";

import User from "../models/user.js";

const KStrategy = Strategy.Strategy;

export default () => {
  passport.use(new KStrategy({
    clientID: process.env.KAKAO_ID,
    callbackURL: "/auth/kakao/callback",
  }, async (accessToken, refreshToken, profile, done) => {
    console.log(profile);
  }));
}