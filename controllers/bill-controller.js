import * as billsDao from "../dao/bills/bills-dao.js";
import * as userDao from "../dao/users/users-dao.js";
import { ObjectId } from "mongodb";

const BillController = (app) => {
  const findAllBills = async (req, res) => {
    const bills = await billsDao.findAllBills();
    res.json(bills);
  };

  const findBillById = async (req, res) => {
    console.log("find bill", req.query.id);
    try {
      const bill = await billsDao.findBillById(new ObjectId(req.query.id));
      res.status(200).json(bill);
    } catch (e) {
      res.status(404).json(e);
    }
  };

  const findBillsByUserId = async (req, res) => {
    console.log("find bills", req.query.uid);
    const bills = await billsDao.findBillsByUserId(new ObjectId(req.query.uid));
    res.json(bills);
  };

  const findBillsByType = async (req, res) => {
    console.log("find bills", req.query.type);
    const type = req.query.type == 0 ? false : true;
    console.log(type);
    const bills = await billsDao.findBillsByType(type);
    res.json(bills);
  };

  const findBillsByCategories = async (req, res) => {
    console.log("find bills", req.body.categories);
    const bills = await billsDao.findBillsByCategories(req.body.categories);
    res.json(bills);
  };

  const findBillsByTime = async (req, res) => {
    console.log("find bills ", req.body.start, " to ", req.body.end);
    const bills = await billsDao.findBillsByTime(req.body.start, req.body.end);
    res.json(bills);
  };

  const findBillsByCost = async (req, res) => {
    console.log("find bills ", req.body.low, " to ", req.body.high);
    const bills = await billsDao.findBillsByCost(req.body.low, req.body.high);
    res.json(bills);
  };

  const findBillsByContents = async (req, res) => {
    console.log("find bills", req.query.contents);
    const bills = await billsDao.findBillsByContents(req.query.contents);
    res.json(bills);
  };

  const createBill = async (req, res) => {
    const newBill = req.body;
    newBill.userID = req.session["currentUser"]._id;
    const insertedBill = await billsDao.createBill(newBill);
    const user = req.session["currentUser"];
    console.log(user);
    console.log(insertedBill);
    if (!insertedBill.type) {
      user.credit += 1;
    } else {
      user.credit += parseInt(insertedBill.cost / 10) + 1;
    }
    user.bills.unshift(insertedBill._id.toString());
    const result = await userDao.updateUser(user._id, user);
    res.json(insertedBill);
  };

  const deleteBill = async (req, res) => {
    const billIdToDelete = req.params.id;
    const bill = await billsDao.findBillById(billIdToDelete);
    console.log(bill);
    const user = await userDao.findUserById(bill.userID);
    user.bills = user.bills.filter((e) => e.toString() != bill._id.toString());
    const result = await userDao.updateUser(user._id, user);
    req.session["currentUser"] = user;
    const status = await billsDao.deleteBill(billIdToDelete);
    res.json(status);
  };

  const updateBill = async (req, res) => {
    const billIdToUpdate = req.body._id;
    const updates = req.body;
    const result = await billsDao.updateBill(billIdToUpdate, updates);
    const bill = await billsDao.findBillById(billIdToUpdate);
    res.json(bill);
  };

  app.post("/api/bills/create", createBill);
  app.get("/api/bills/all", findAllBills);
  app.get("/api/bills/contents", findBillsByContents);
  app.post("/api/bills/categories", findBillsByCategories);
  app.get("/api/bills/id", findBillById);
  app.get("/api/bills/uid", findBillsByUserId);
  app.get("/api/bills/type", findBillsByType);
  app.post("/api/bills/time", findBillsByTime);
  app.post("/api/bills/cost", findBillsByCost);
  app.post("/api/bills/update", updateBill);
  app.delete("/api/bills/delete/:id", deleteBill);
};

export default BillController;
