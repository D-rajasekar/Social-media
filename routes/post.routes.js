import express from "express";
import postController from "../controllers/post.controller.js";
import multer from "multer";
import { auth } from "../Middleware/auth.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

const upload = multer({ storage });

router.route("/image").post(auth,upload.single("image"), postController.postimage);
router.route("/").post(auth,postController.createPost);
router.route("/comments").post(auth,postController.createcomment);
router.route("/").get(auth,postController.getAllPost);
router.route("/comment/:id").get(auth,postController.getcomment);
router.route("/followerslist").get(auth,postController.getfollowers);
router.route("/follow").post(auth,postController.createfollowing);
router.route("/followinglist").get(auth,postController.getfollowing);
router.route("/id").get(auth,postController.getPost);
export default router;
