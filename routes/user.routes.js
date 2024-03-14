import express from "express";
import usersController from "../controllers/user.controller.js";
import { auth } from "../Middleware/auth.js";

const router = express.Router();

router.route("/signup").post(usersController.signup);
router.route("/login").post(usersController.login);
router.route("/logout").post(auth, usersController.logout);
router.route("/").get(auth, usersController.getalluser); //admin
router.route("/profile").get(auth, usersController.getprofile);

export default router;
