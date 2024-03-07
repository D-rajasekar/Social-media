import postService from "../services/post.service.js";
import userService from "../services/user.service.js";

async function createPost(request, response) {
  // console.log(request.body);
  var { subject, description, Timestamp, Image } = request.body;

  const token_key = request.header("x-auth-token");
  console.log(token_key);
  const id = await userService.getIDByToken(token_key);

  var create_post = await postService.createPostQuery(
    id.user_id,
    subject,
    description,
    Timestamp,
    Image
  );
  // response.send(insertedValue);
  response.send(create_post);
}

async function createcomment(request,response){
    var ans = request.body;
    var commentcreated = await postService.createCommentQuery(ans);
    // response.send(insertedValue);
    response.send(commentcreated);
}

async function updatePost(request, response) {
    // console.log(request.body);
    const { id } = request.params;
    const ans = request.body;
    const msg = { msg: "not found" };
    var updateAlbumByID = await postService.updatePostByIDQuery(ans, id);
    updateAlbumByID
      ? response.send(updateAlbumByID)
      : response.status(404).send(msg);
  }

export default { createPost,updatePost,createcomment};
