import passport from "passport";
import Strategy from "passport-kakao";

import User from "../models/user.js";
import Info from "../models/info.js";

const KStrategy = Strategy.Strategy;

export default () => {
  passport.use(new KStrategy({
    clientID: process.env.KAKAO_ID,
    callbackURL: "/auth/kakao/callback",
  }, async (accessToken, refreshToken, profile, done) => {
    try {
      const exist = await User.findOne({ where: { snsId: profile.id }});
      if (exist) return done(null, exist);
      const user = await User.create({
        email: profile._json.kakao_account.email,
        snsId: profile.id,
        provider: profile.provider,
      });
      const info = await Info.create({
        gender: "남자",
        UserId: user.id,
      });
      done(null, user);
    } catch (err) {
      console.error(err);
      done(err);
    }
  }));
}