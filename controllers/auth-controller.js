import * as usersDao from "../dao/users/users-dao.js";
import { createRequire } from 'module';
import bcrypt from "bcryptjs";

const AuthController = (app) => {

  const register = async (req, res) => {
    const phone = req.body.phone;
    const password = req.body.password;
    if (!phone || !password) {
      res.status(422).json({ msg: "phone and password is required" });
      return;
    }
    const user = await usersDao.findUserByPhone(phone);
    if (user) {
      res.status(409).json({ msg: "user has existed" });
      return;
    }
    req.body.password = bcrypt.hashSync(password, 10);
    const newUser = await usersDao.createUser(req.body);
    req.session["currentUser"] = newUser;
    res.json(newUser);
  };

  const login = async (req, res) => {
    const phone = req.body.phone;
    const password = req.body.password;
    if (!phone || !password) {
      res.status(422).json({ msg: "phone or password is required" });
      return;
    }
    const user = await usersDao.findUserByPhone(phone);
    if (user && bcrypt.compareSync(password, user.password)) {
      req.session["currentUser"] = user;
      req.session.userInfo = { phone };
      res.status(200).json({ msg: "login success" });
    } else {
      res.status(404).json({ msg: "login failed" });
    }
  };

  const profile = async (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.status(404).json({ msg: "please login first" });
      return;
    }
    res.json(currentUser);
  };

  const logout = async (req, res) => {
    const currentUser = req.session["currentUser"];
    if (currentUser) {
      req.session.destroy();
      res.status(200).json({ msg: "logout success" });
      return;
    }
    res.status(404).json({ msg: "logout failed" });
  };

  const editProfile = async (req, res) => {
    const currentUser = req.session["currentUser"];
    const uid = currentUser._id;
    const updates = req.body;
    const body = await usersDao.updateUser(uid, updates);
    const user = await usersDao.findUserById(uid);
    req.session["currentUser"] = user;
    const phone = user.phone;
    req.session.userInfo = { phone };
    res.status(200).json(user);
  };

  const editPassword = async (req, res) => {
    const currentUser = req.session["currentUser"];
    const uid = currentUser._id;
    const password = req.body.password;
    req.body.password = bcrypt.hashSync(password, 10);
    const updates = req.body;
    const body = await usersDao.updateUser(uid, updates);
    const user = await usersDao.findUserById(uid);
    req.session["currentUser"] = user;
    const phone = user.phone;
    req.session.userInfo = { phone };
    res.status(200).json(currentUser);
  };

  app.post("/api/users/register", register);
  app.post("/api/users/login", login);
  app.get("/api/users/profile", profile);
  app.post("/api/users/logout", logout);
  app.post("/api/users/edit", editProfile);
  app.post("/api/users/password", editPassword);
};
export default AuthController;
