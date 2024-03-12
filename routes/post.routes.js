import express from "express";
import postController from "../controllers/post.controller.js";
import multer from "multer";

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

router.route("/image").post(upload.single("image"), postController.postimage);
router.route("/").post(postController.createPost);


router.route("/comments").post(postController.createcomment);
router.route("/").get(postController.getAllPost);
router.route("/comment/:id").get(postController.getcomment);
router.route("/followerslist").get(postController.getfollowers);
router.route("/follow").post(postController.createfollowing);
router.route("/followinglist").get(postController.getfollowing);
router.route("/:id").get(postController.getPost);
export default router;
