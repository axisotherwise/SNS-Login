import passport from "passport";
import test from "passport-naver";

import User from "../models/user.js";

const NaverStrategy = test.Strategy;

export default () => {
  passport.use(new NaverStrategy({
    clientID: process.env.CI,
    clientSecret: process.env.CS,
    callbackURL: "/auth/naver/callback",
  }, async (accessToken, refreshToken, profile, done) => {
    try {
    const exUser = await User.findOne({ where: { snsId: profile._json.id }});
    if (exUser) return done(null, exUser);
      const newUser = await User.create({
        snsId: profile._json.id,
        provider: profile.provider,
      });
      return done(null, newUser);
    } catch (err) {
      console.error(err);
      done(err);
    }
  }));
}