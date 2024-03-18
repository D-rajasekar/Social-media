import { DataTypes } from "sequelize";
import { sequelize } from "../config.js";
import { Post } from "./post.model.js"; // Assuming the path is correct
import { UserDetails } from "./user.model.js";

const Comment = sequelize.define(
  "Comment",
  {
    // Model attributes are defined here
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    // Other model options go here
  }
);

Comment.belongsTo(Post, {
  foreignKey: { allowNull: false },
  onDelete: "CASCADE",
});
Comment.belongsTo(UserDetails, { foreignKey: { allowNull: false } });

export { Comment };
