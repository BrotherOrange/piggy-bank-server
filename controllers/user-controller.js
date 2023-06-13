import Parse from "parse/node.js";

const UserController = (app) => {
  const register = async (req, res) => {
    const user = new Parse.User();
    user.set("username", req.body.username);
    user.set("email", req.body.email);
    user.set("birthday", Date.parse(req.birthday));
    user.set("password", req.password);

    try {
      let userResult = await user.signUp();
      res.status(200).json(userResult);
    } catch (error) {
      res.status(404).json(error);
    }
  };

  const login = async (req, res) => {
    try {
      let user = await Parse.User.logIn(req.body.username, req.body.password);
      res.status(200).json(user);
      Parse.User.logOut();
    } catch (error) {
      res.status(404).json(error);
    }
  };

  const resetPassword = async (req, res) => {
    const User = new Parse.User();
    const query = new Parse.Query(User);
    try {
      let user = await query.get(req.body._id);
      try {
        let result = await Parse.User.requestPasswordReset(user.email);
        res.status(200).json(result);
      } catch (error) {
        res.status(404).json(error);
      }
    } catch (error) {
      res.status(404).json(error);
    }
  };

  const editProfile = async (req, res) => {
    const User = new Parse.User();
    const query = new Parse.Query(User);
    try {
      let user = await query.get(req.body._id);
      user.set("username", req.body.username);
      user.set("email", req.body.email);
      user.set("gender", req.body.gender);
      user.set("birthday", Date().parse(req.body.birthday));
      try {
        let response = await user.save();
        res.status(200).json(response);
      } catch (error) {
        res.status(404).json(error);
      }
    } catch (error) {
      res.status(404).json(error);
    }
  };

  const editBio = async (req, res) => {
    const User = new Parse.User();
    const query = new Parse.Query(User);
    try {
      let user = await query.get(req.body._id);
      user.set("bio", req.body.bio);
      try {
        let response = await user.save();
        res.status(200).json(response);
      } catch (error) {
        res.status(404).json(error);
      }
    } catch (error) {
      res.status(404).json(error);
    }
  };

  const editAvatar = async (req, res) => {
    const User = new Parse.User();
    const query = new Parse.Query(User);
    try {
      let user = await query.get(req.body._id);
      user.set("avatar", new Parse.File(req.body.avatarName, req.body.avatar));
      try {
        let response = await user.save();
        res.status(200).json(response);
      } catch (error) {
        res.status(404).json(error);
      }
    } catch (error) {
      res.status(404).json(error);
    }
  };

  const editBanner = async (req, res) => {
    const User = new Parse.User();
    const query = new Parse.Query(User);
    try {
      let user = await query.get(req.body._id);
      user.set("banner", new Parse.File(req.body.bannerName, req.body.banner));
      try {
        let response = await user.save();
        res.status(200).json(response);
      } catch (error) {
        res.status(404).json(error);
      }
    } catch (error) {
      res.status(404).json(error);
    }
  };

  const editKeywords = async (req, res) => {
    const User = new Parse.User();
    const query = new Parse.Query(User);
    try {
      let user = await query.get(req.body._id);
      user.set("keywords", req.body.keywords);
      try {
        let response = await user.save();
        res.status(200).json(response);
      } catch (error) {
        res.status(404).json(error);
      }
    } catch (error) {
      res.status(404).json(error);
    }
  };

  const editStatus = async (req, res) => {
    const User = new Parse.User();
    const query = new Parse.Query(User);
    try {
      let user = await query.get(req.body._id);
      user.set("status", req.body.status);
      try {
        let response = await user.save();
        res.status(200).json(response);
      } catch (error) {
        res.status(404).json(error);
      }
    } catch (error) {
      res.status(404).json(error);
    }
  };

  const find = async (req, res) => {
    const User = new Parse.User();
    const query = new Parse.Query(User);
    try {
      let user = await query.get(req.params.id);
      res.status(200).json(user);
    } catch (error) {
      res.status(404).json(error);
    }
  };

  app.post("/api/users/register", register);
  app.post("/api/users/login", login);
  app.post("/api/users/reset-password", resetPassword);
  app.put("/api/users/edit-profile", editProfile);
  app.put("/api/users/edit-bio", editBio);
  app.put("/api/users/edit-avatar", editAvatar);
  app.put("/api/users/edit-banner", editBanner);
  app.put("/api/users/edit-keywords", editKeywords);
  app.put("/api/users/edit-status", editStatus);
  app.get("/api/users/find/:id", find);
};

export default UserController;
