import { DataTypes } from "sequelize";
import { sequelize } from "../config.js";
// import { role } from "./role.model.js";

const Post = sequelize.define(
  "Post",
  {
    // Model attributes are defined here
    post_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    user_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    subject: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Timestamp: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: new Date().toString(),
    },
    Image: {
      type: DataTypes.STRING,
      validate: { isUrl: true },
      allowNull: true,
    },
  },
  {
    // Other model options go here
  }
);

export { Post };
