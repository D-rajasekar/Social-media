import express from "express";
import usersController from "../controllers/user.controller.js";

const router = express.Router();

router.route("/signup").post(usersController.signup);
router.route("/login").post(usersController.login);
router.route("/logout").post(usersController.logout);
router.route("/").get(usersController.getalluser);//admin
router.route("/profile").get(usersController.getprofile);



export default router;
