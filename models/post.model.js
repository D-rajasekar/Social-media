import { DataTypes } from "sequelize";
import { sequelize } from "../config.js";
import { UserDetails } from "./user.model.js"; // Import the Followers model

const Post = sequelize.define(
  "Post",
  {
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

Post.belongsTo(UserDetails, { foreignKey: { allowNull: false } });

export { Post };
