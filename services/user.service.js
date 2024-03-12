import { Post } from "../models/post.model.js";
import { Session } from "../models/session.model.js";
import { UserDetails } from "../models/user.model.js";

async function getalluserQuery() {
  return await UserDetails.findAll();
}
async function getprofileQuery(id) {
  return await UserDetails.findOne({
    where: {
      id,
    },
    attributes: ["username"],
  });
}

async function signupQuery({ username, password }) {
  try {
    return await UserDetails.create({ username, password });
  } catch (error) {
    return { msg: error };
  }
}

async function loginQuery({ username }) {
  return await UserDetails.findOne({
    where: {
      username,
    },
  });
}

async function logoutQuery(id) {
  return await Session.update({ expired: "yes" }, { where: { user_id: id } });
}

async function addToken(user_id, token) {
  return await Session.create({ user_id: user_id, token });
}

async function getIDByToken(tokenKey) {
  return await Session.findOne({
    where: {
      token: tokenKey,
    },
  });
}

async function PostPic(url, user_id) {
  return await Post.update(
    { Image: url },
    {
      where: {
        id: user_id,
      },
    }
  );
}
export default {
  signupQuery,
  loginQuery,
  addToken,
  getIDByToken,
  logoutQuery,
  PostPic,
  getalluserQuery,
  getprofileQuery,
};
