import { Comment } from "../models/comment.model.js";
import { Post } from "../models/post.model.js";

async function createPostQuery(
  user_id,
  subject,
  description,
  Timestamp,
  Image
) {
  return await Post.create({
    user_id,
    subject,
    description,
    Timestamp,
    Image,
  });
}
async function createCommentQuery(ans) {
    return await Comment.create(ans);
  }
  
async function updatePostByIDQuery(ans, id) {
  return await Post.update(ans, {
    where: {
      id: id,
    },
  });
}
export default { createPostQuery, updatePostByIDQuery,createCommentQuery };
