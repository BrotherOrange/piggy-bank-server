import billsModel from "./bills-model.js";
export const findAllBills = () => billsModel.find();
export const findBillById = (bid) => billsModel.findById(bid);
export const findBillsByUserId = (uid) => billsModel.find({userID: uid});
export const findBillsByType = (type) => billsModel.find({type: type});
export const findBillsByCategories = (categories) => {
  const queries = [];
  categories.forEach((category) => {
    queries.push({ category: category });
  });
  return billsModel.find({ $or: queries });
};
export const findBillsByContents = (contents) => {
  const queries = [];
  queries.push({ title: { $regex: contents, $options: "i" } });
  queries.push({ note: { $regex: contents, $options: "i" } });
  return billsModel.find({ $or: queries });
};
export const findBillsByTime = (start, end) =>
  billsModel.find({ createdAt: { $gte: start, $lte: end } });
export const findBillsByCost = (low, high) =>
  billsModel.find({ cost: { $gte: low, $lte: high } });
export const createBill = (bill) => billsModel.create(bill);
export const deleteBill = (bid) => billsModel.findByIdAndDelete(bid);
export const updateBill = (bid, bill) =>
  billsModel.findByIdAndUpdate(bid, { $set: bill });
