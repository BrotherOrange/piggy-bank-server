import Parse from "parse/node.js";

const UserController = (app) => {
  const register = async (req, res) => {
    const user = new Parse.User();
    user.set('username', 'Curly');
    user.set('email', 'test@gmail.com');
    user.set('password', '123');
  
    try {
      let userResult = await user.signUp();
      res.status(200).json(userResult);
    } catch (error) {
      res.status(404).json(error);
    }
  }

  app.post("/api/users/register", register);
}
export default UserController;