import { DataTypes } from "sequelize";
import { sequelize } from "../config.js";
import { UserDetails } from "./user.model.js";


const Followers = sequelize.define(
  "Followers",
  {
    uid: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    followers: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    // Other model options go here
  }
);
// Followers.belongsTo(UserDetails, { foreignKey: { allowNull: false } });

export {  };
