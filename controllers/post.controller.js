import postService from "../services/post.service.js";
import userService from "../services/user.service.js";
import { v2 as cloudinary } from "cloudinary";

async function createPost(request, response) {
  var { subject, description, Timestamp } = request.body;
  const token_key = request.header("x-auth-token");
  console.log(token_key);
  try {
    const id = await userService.getIDByToken(token_key);
    var create_post = await postService.createPostQuery(
      id.user_id,
      subject,
      description,
      Timestamp
    );
    // response.send(insertedValue);
    response.send(create_post);
  } catch (error) {
    response.status(500).send({ msg: "something went wrong" });
  }
}

async function postimage(request, response) {
  // console.log(request.body);

  const token_key = request.header("x-auth-token");
  console.log(token_key);

  try {
    const id = await userService.getIDByToken(token_key);

    //console.log("**********");
    // console.log(id.user_id);

    cloudinary.config({
      secure: true,
    });

    const uploadImage = async (imagePath) => {
      const options = {
        use_filename: true,
        unique_filename: false,
        overwrite: true,
      };

      try {
        // Upload the image
        const result = await cloudinary.uploader.upload(imagePath, options);
        console.log(result);
        return result;
      } catch (error) {
        console.error(error);
      }
    };

    console.log(cloudinary.config());

    const imagePath = request.file.path;
    const img = await uploadImage(imagePath);

    response.send({ msg: "uploaded", url: img.secure_url });
    console.log("Uploaded in cloud");
  } catch (error) {
    response.status(500).send({ msg: "something went wrong" });
  }

  // var tokenKey = request.header("x-auth-token");
  // console.log("***************", tokenKey);
  // const id = await userService.findIdByToken(token_key);
  // await userService.PostPic(publicId.secure_url, id.user_id);
}

async function createcomment(request, response) {
  var ans = request.body;
  try {
    var commentcreated = await postService.createCommentQuery(ans);
    // response.send(insertedValue);
    response.send(commentcreated);
  } catch (error) {
    response.status(500).send({ msg: "something went wrong" });
  }
}
async function getAllPost(request, response) {
  var querys = request.query;
  try {
    const page = querys?.page || 1;
    const limit = querys?.limit || 5;
    let dbQuery = {};
    // console.log(querys);
    if (querys.orderBy && querys.order) {
      dbQuery.order = [[querys.orderBy, querys.order]];
    }
    if ("page" in querys || "limit" in querys) {
      dbQuery.offset = (page - 1) * limit;
      dbQuery.limit = limit;
    }
    var result = await postService.getAllPostQuery(dbQuery);
    response.send(result);
  } catch (error) {
    response.status(500).send({ msg: "something went wrong" });
  }
}

async function getPost(request, response) {
  //   console.log(request.params.id);
  const token_key = request.header("x-auth-token");
  console.log(token_key);
  try {
    const id = await userService.getIDByToken(token_key);

    var getAlbumByID = await postService.getPostIDQuery(id.user_id);
    response.send(getAlbumByID);
  } catch (error) {
    response.status(500).send({ msg: "something went wrong" });
  }
}

async function createfollowing(request, response) {
  var { following } = request.body;
  const token_key = request.header("x-auth-token");
  console.log(token_key);

  try {
    const id = await userService.getIDByToken(token_key);

    var follows = await postService.createFollowService(id.user_id, following);
    var ans = await postService.createfollowQuery(id.user_id, following);
    // response.send(insertedValue);
    response.send(follows);
  } catch (error) {
    response.status(500).send({ msg: "something went wrong" });
  }
}

async function getcomment(request, response) {
  var { id } = request.params;
  const token_key = request.header("x-auth-token");

  try {
    // const id = await userService.getIDByToken(token_key);
    var commentid = await postService.getcommentQuery(id);
    console.log("...................", commentid);
    response.send({ comments: commentid });
  } catch (error) {
    response.status(500).send({ msg: "something went wrong" });
  }
}

async function getfollowers(request, response) {
  const token_key = request.header("x-auth-token");
  console.log(token_key);
  try {
    const id = await userService.getIDByToken(token_key);
    console.log("......................", id);
    var followers_list = await postService.getfollowersQuery(id.user_id);
    response.send(followers_list);
  } catch (error) {
    response.status(500).send({ msg: "something went wrong" });
  }
}

async function getfollowing(request, response) {
  const token_key = request.header("x-auth-token");
  console.log(token_key);
  try {
    const id = await userService.getIDByToken(token_key);
    console.log("......................", id);
    var following_list = await postService.getfollowingQuery(id.user_id);
    response.send(following_list);
  } catch (error) {
    response.status(500).send({ msg: "something went wrong" });
  }
}
export default {
  createPost,
  getPost,
  createcomment,
  createfollowing,
  getAllPost,
  getcomment,
  getfollowers,
  postimage,
  getfollowing,
};
