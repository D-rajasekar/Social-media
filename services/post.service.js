import { Comment } from "../models/comment.model.js";
import { Followers } from "../models/followers.model.js";
import { Following } from "../models/following.model.js";
import { Post } from "../models/post.model.js";
import { UserDetails } from "../models/user.model.js";

async function createPostQuery(UserDetailId, subject, description, Timestamp) {
  return await Post.create({
    UserDetailId,
    subject,
    description,
    Timestamp,
  });
}
async function createCommentQuery(ans) {
  return await Comment.create(ans);
}

async function getAllPostQuery(dbQuery) {
  return await Post.findAll(dbQuery);
}
async function getPostIDQuery(id) {
  return await Post.findAll({
    where: {
      UserDetailId: id,
    },
  });
}

async function createFollowService(uid, following) {
  return await Following.create({ uid, following });
}

async function createfollowQuery(uid, follower) {
  return await Followers.create({ uid: follower, followers: uid });
}

async function getcommentQuery(id) {
  return await Comment.findAll({
    where: {
      PostId: id,
    },
    attributes: ["content"],
  });
}
async function getfollowersQuery(id) {
  return await Followers.findAll({
    where: {
      uid: id,
    },
  });
}

async function getfollowingQuery(id) {
  return await Following.findAll({
    where: {
      uid: id,
    },
  });
}

export default {
  createPostQuery,
  getPostIDQuery,
  createCommentQuery,
  createfollowQuery,
  createFollowService,
  getAllPostQuery,
  getcommentQuery,
  getfollowersQuery,
  getfollowingQuery,
};
