import { DataTypes } from "sequelize";
import { sequelize } from "../config.js";
import { Post } from "./post.model.js"; // Assuming the path is correct

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

Comment.belongsTo(Post, { foreignKey: { allowNull: false } });

export { Comment };
