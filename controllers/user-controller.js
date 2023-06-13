import * as usersDao from "../dao/users/users-dao.js";

const UserController = (app) => {
  const findAllUser = async (req, res) => {
    const users = await usersDao.findAllUsers();
    console.log("findAllUser");
    res.json(users);
  };
  
  const findUserById = async (req, res) => {
    console.log("findUser", req.params.id);
    const userId = new ObjectId(req.params.id);
    const user = await usersDao.findUserById(userId);
    res.json(user);
  };
  
  const findUserByPhone = async (req, res) => {
    console.log("findUser", req.params.phone);
    const email = req.params.phone;
    const user = await usersDao.findUserByEmail(email);
    res.json(user);
  };
  
  const findUsersByNickname = async (req, res) => {
    console.log("findUser", req.params.nickname);
    const nickname = req.params.nickname;
    const users = await usersDao.findUsersByNickname(nickname);
    res.json(users);
  };

  const findUsersByBirth = async (req, res) => {
    console.log("findUser", req.body.birthday);
    const birthday = req.body.birthday;
    const users = await usersDao.findUsersByBirth(birthday);
    res.json(users);
  };

  app.get("/api/users/all", findAllUser);
  app.get("/api/users/id/:id", findUserById);
  app.get("/api/users/phone/:phone", findUserByPhone);
  app.get("/api/users/nickname/:nickname", findUsersByNickname);
  app.post("/api/users/birthday", findUsersByBirth);
};

export default UserController;
