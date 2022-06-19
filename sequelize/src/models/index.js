import Sequelize from "sequelize";
import config from "../config/config.js";

import User from "./user.js";
import Info from "./info.js";
import Post from "./post.js";
import Image from "./image.js";
import Hashtag from "./hashtag.js";

const configEnv = config.development;

const db = {};
const sequelize = new Sequelize(
  configEnv.database,
  configEnv.username,
  configEnv.password,
  configEnv,
);

db.sequelize = sequelize;
db.User = User;
db.Info = Info;
db.Post = Post;
db.Image = Image;
db.Hashtag = Hashtag;

User.init(sequelize);
Info.init(sequelize);
Post.init(sequelize);
Image.init(sequelize);
Hashtag.init(sequelize);

User.associate(db);
Info.associate(db);
Post.associate(db);
Image.associate(db);
Hashtag.associate(db);

export {
  sequelize,
  db,
}








