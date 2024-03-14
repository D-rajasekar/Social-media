import userService from "../services/user.service.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

async function getalluser(request, response) {
  var head = request.header("x-auth-token");
  try {
    const decodedToken = jwt.verify(head, process.env.SECRET_KEY);
    if (decodedToken.role == "Admin") {
      const userData = userService.getalluserQuery();
      response.send(await userData);
    } else {
      response.stauts(403).send({ msg: "only admins can view all users" });
    }
  } catch (error) {
    response.status(500).send({ msg: "something went wrong" });
  }
}

async function getprofile(request, response) {
  const token_key = request.header("x-auth-token");
  console.log(token_key);
  try {
    const id = await userService.getIDByToken(token_key);
    console.log("????????????????????????", id);

    const userData = await userService.getprofileQuery(id.user_id);
    response.send(userData);
  } catch (error) {
    response.status(500).send({ msg: "something went wrong" });
  }
}

async function genHashPassword(userPassword) {
  const NO_OF_ROUNDS = 10;
  const salt = await bcrypt.genSalt(NO_OF_ROUNDS);
  console.log(salt);
  const hashedPassword = await bcrypt.hash(userPassword, salt);
  console.log(hashedPassword);
  return hashedPassword;
}

async function signup(request, response) {
  console.log(request.body);
  const { username, password } = request.body;
  try {
    if (password.length <= 8) {
      response.status(400).send({
        msg: "password should be more than 8 charcters",
      });
    } else {
      const hashedPassword = await genHashPassword(password);
      console.log(hashedPassword);
      var usersignup = await userService.signupQuery({
        username,
        password: hashedPassword,
      });

      response.send({ msg: "successfully Signed up" });

      // response.status(500).send({ msg: "can't sign up" });
    }
  } catch (error) {
    response.status(501).send({ msg: "something went wrong" });
  }
}
async function login(request, response) {
  console.log(request.body);

  const { username, password } = request.body;
  try {
    const userFromDB = await userService.loginQuery({ username });
    console.log(userFromDB);

    if (!userFromDB) {
      response.status(401).send({ msg: "Invalid credentials" });
    } else {
      const storedDBPassword = userFromDB.password;
      const role = userFromDB.role_id == 1 ? "Admin" : "Normal User";
      const isPasswordCheck = await bcrypt.compare(password, storedDBPassword);
      console.log(isPasswordCheck);

      if (isPasswordCheck) {
        const currentTimestamp = Math.floor(Date.now() / 1000);
        const token = jwt.sign(
          {
            id: userFromDB.id,
            role: role,
            iat: currentTimestamp,
            exp: currentTimestamp + 15 * 60,
          },
          process.env.SECRET_KEY
        );

        userService.addToken(userFromDB.id, token);
        response.send({ msg: "Successful login", token });
      } else {
        response.status(404).send({ msg: "Invalid credentials" });
      }
    }
  } catch (error) {
    response.status(500).send({ msg: "something went wrong" });
  }
}

async function logout(request, response) {
  const token_key = request.header("x-auth-token");
  console.log(token_key);
  try {
    const id = await userService.getIDByToken(token_key);
    console.log(id);
    await userService.logoutQuery(id.user_id);

    response.send("token expired");
  } catch (error) {
    response.status(501).send({ msg: "something went wrong" });
  }
}

export default { signup, login, logout, getalluser, getprofile };
