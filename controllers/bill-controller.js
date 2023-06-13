import Parse from "parse/node.js";

const BillController = (app) => {
  const create = async (req, res) => {
    const User = new Parse.User();
    const query = new Parse.Query(User);
    try {
      let user = await query.get(req.body.id);
      const myNewObject = new Parse.Object("Bill");
      myNewObject.set("title", req.body.title);
      myNewObject.set("cost", req.body.cost);
      myNewObject.set("type", req.body.type);
      myNewObject.set("user", user);
      myNewObject.set("category", req.body.category);
      myNewObject.set("note", req.body.note);
      myNewObject.set("images", req.body.images);
      try {
        const result = await myNewObject.save();
        // Access the Parse Object attributes using the .GET method
        console.log("Bill created", result);
      } catch (error) {
        console.error("Error while creating Bill: ", error);
      }
    } catch (error) {
      res.status(404).json(error);
    }
  };

  app.post("/api/bill/create", register);
};

export default BillController;
