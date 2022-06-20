import passport from "passport";
import K from "./KStrategy.js";

import User from "../models/user.js";
import Info from "../models/info.js";

export default () => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findOne({
        where: { id },
        include: [{
          model: Info,
        }],
      });
      done(null, user);
    } catch (err) {
      console.error(err);
      done(err);
    }
  });
  K();
}