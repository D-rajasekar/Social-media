import { DataTypes } from "sequelize";
import { sequelize } from "../config.js";
import { Post } from "./post.model.js"; // Assuming the path is correct

const Comment = sequelize.define(
  "Comment",
  {
    // Model attributes are defined here

    postId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: false,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    // Other model options go here
  }
);

// Define the association between Post and Comment
Post.hasMany(Comment, {
  foreignKey: {
    name: "postId",
    allowNull: false,
    unique: false,
  },
  onDelete: "CASCADE", // This ensures that if a post is deleted, its associated comments are also deleted
});
Comment.belongsTo(Post, { foreignKey: "post_id" });

export { Comment };
