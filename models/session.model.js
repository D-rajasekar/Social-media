import { DataTypes } from "sequelize";
import { sequelize } from "../config.js";

const Session = sequelize.define(
  "Session",
  {
    // Model attributes are defined here
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    // Other model options go here
  }
);

export { Session };
