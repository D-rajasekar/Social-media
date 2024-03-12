import { DataTypes } from "sequelize";
import { sequelize } from "../config.js";
import { UserDetails } from "./user.model.js";

const Following = sequelize.define(
  "Following",
  {
    uid: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    following: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    // Other model options go here
  }
);
// Followers.belongsTo(UserDetails, { foreignKey: { allowNull: false } });

export { Following };
