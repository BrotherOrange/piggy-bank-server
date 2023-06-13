import mongoose from "mongoose";
import billsSchema from "./bills-schema.js";
const billsModel = mongoose.model("billsModel", billsSchema);
export default billsModel;