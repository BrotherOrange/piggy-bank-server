import * as usersDao from "../dao/users/users-dao.js";
import { ObjectId } from "mongodb";

const UserController = (app) => {
  const findAllUser = async (req, res) => {
    const users = await usersDao.findAllUsers();
    console.log("findAllUser");
    res.json(users);
  };
  
  const findUserById = async (req, res) => {
    console.log("findUser", req.query.uid);
    const uid = new ObjectId(req.query.uid);
    const user = await usersDao.findUserById(uid);
    res.json(user);
  };
  
  const findUserByPhone = async (req, res) => {
    console.log("findUser", req.query.phone);
    const phone = req.query.phone;
    const user = await usersDao.findUserByPhone(phone);
    res.json(user);
  };
  
  const findUsersByNickname = async (req, res) => {
    console.log("findUser", req.query.nickname);
    const nickname = req.query.nickname;
    const users = await usersDao.findUsersByNickname(nickname);
    res.json(users);
  };

  const findUsersByBirth = async (req, res) => {
    console.log("findUser", req.query.birthday);
    const birthday = req.query.birthday;
    const users = await usersDao.findUsersByBirth(birthday);
    res.json(users);
  };

  app.get("/api/users/all", findAllUser);
  app.get("/api/users/id", findUserById);
  app.get("/api/users/phone", findUserByPhone);
  app.get("/api/users/nickname", findUsersByNickname);
  app.get("/api/users/birthday", findUsersByBirth);
};

export default UserController;
