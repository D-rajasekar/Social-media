import express from "express";
import postController from "../controllers/post.controller.js";

const router = express.Router();

router.route("/").post(postController.createPost);
router.route("/:id").put(postController.updatePost);
router.route("/comments").post(postController.createcomment);
export default router;
