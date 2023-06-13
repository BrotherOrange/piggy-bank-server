import billsModel from "./bills-model.js";
export const findAllBills = () => billsModel.find();
export const findBillById = (bid) => billsModel.findById(bid);
export const findBillsByCategories = (categories) => {
  const queries = [];
  categories.forEach((category) => {
    queries.push({ category: category });
  });
  return billsModel.find({ $or: queries });
};
export const findBillsByContents = (body) => {
  const queries = [];
  Object.keys(body).forEach(function (key) {
    if (key === "title") {
      queries.push({ title: { $regex: body[key], $options: "i" } });
    } else if (key === "note") {
      queries.push({ note: { $regex: body[key], $options: "i" } });
    } else if (key === "category") {
      queries.push({ category: { $regex: body[key], $options: "i" } });
    }
  });
  return billsModel.find({ $or: queries });
};
export const findBillsByTime = (start, end) =>
  billsModel.find({ createdAt: { $gte: start, $lte: end } });
export const findBillsByCost = (low, high) =>
  billsModel.find({ cost: { $gte: low, $lte: high } });
export const createBill = (bill) => billsModel.create(bill);
export const deleteBill = (bill) => billsModel.findByIdAndDelete(bill);
export const updateBill = (bid, bill) =>
  billsModel.findByIdAndUpdate(bid, { $set: bill });
