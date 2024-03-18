import { Comment } from "../models/comment.model.js";
//import { Followers } from "../models/followers.model.js";
import { Following } from "../models/following.model.js";
import { Post } from "../models/post.model.js";
import { UserDetails } from "../models/user.model.js";

async function createPostQuery(UserDetailId, Image, subject, description) {
  try {
    return await Post.create({
      UserDetailId,
      Image,
      subject,
      description,
    });
  } catch (error) {
    return { msg: "something error in post" };
  }
}
async function createCommentQuery(PostId, content, UserDetailId) {
  return await Comment.create({
    PostId,
    content,
    UserDetailId,
  });
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

// async function createfollowQuery(uid, follower) {
//   return await Following.create({ uid: follower, followers: uid });
// }

async function getcommentQuery(id) {
  return await Comment.findAll({
    where: {
      PostId: id,
    },
    attributes: ["content"],
  });
}
async function getfollowersQuery(id) {
  return await Following.findAll({
    where: {
      following: id,
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

async function deletePostQuery(PostId, UserDetailId) {
  return await Post.destroy({
    where: {
      id: PostId,
      UserDetailId,
    },
  });
}

export default {
  createPostQuery,
  getPostIDQuery,
  createCommentQuery,
  // createfollowQuery,
  createFollowService,
  getAllPostQuery,
  getcommentQuery,
  getfollowersQuery,
  getfollowingQuery,
  deletePostQuery,
};
