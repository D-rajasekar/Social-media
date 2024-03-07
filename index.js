// const express = require("express"); // "type": "commonjs"
import express from "express"; // "type": "module"
import { sequelize } from "./config.js";
import userRouter from "./routes/user.routes.js";
import { Roles } from "./models/role.model.js";
import postRouter from "./routes/post.routes.js";

try {
  await sequelize.authenticate();
  await sequelize.sync();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

const app = express();
app.use(express.json());

const PORT = 4000;
app.get("/", function (request, response) {
  response.send("🙋‍♂️, 🌏 🎊✨🤩");
});
//Roles.create({role_id:2,role_name:"Normal user"})
app.use("/users", userRouter);
app.use("/posts", postRouter);
app.listen(PORT, () => console.log(`The server started in: ${PORT} ✨✨`));
