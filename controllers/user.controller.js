import userService from "../services/user.service.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
  if (password.length <= 8) {
    response.status(400).send({
      msg: "password should be more than 8 charcters",
    });
  } else {
    const hashedPassword = await genHashPassword(password);
    console.log(hashedPassword);
    response.send(
      await userService.signupQuery({
        username,
        password: hashedPassword,
      })
    );
  }
}
async function login(request, response) {
  console.log(request.body);

  const { username, password } = request.body;
  const userFromDB = await userService.loginQuery({ username });
  console.log(userFromDB);

  if (!userFromDB) {
    response.status(401).send({ msg: "Invalid credentials" });
  } else {
    const storedDBPassword = userFromDB.password;
    const isPasswordCheck = await bcrypt.compare(password, storedDBPassword);
    console.log(isPasswordCheck);

    if (isPasswordCheck) {
      const token = jwt.sign({ id: userFromDB.id }, process.env.SECRET_KEY);
      userService.addToken(userFromDB.id, token);
      response.send({ msg: "Successful login", token });
    } else {
      response.status(404).send({ msg: "Invalid credentials" });
    }
  }
}

async function logout(request, response) {
  const token_key = request.header("x-auth-token");
  console.log(token_key);
  const id = await userService.getIDByToken(token_key);
  console.log(id);
  await userService.logoutQuery(id.user_id);

  response.send("token expired");
}

export default { signup, login, logout };
