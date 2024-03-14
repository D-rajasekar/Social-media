import { DataTypes } from "sequelize";
import { sequelize } from "../config.js";
 
const Roles = sequelize.define("role", {
  role_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
  },
  role_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
 
export { Roles }