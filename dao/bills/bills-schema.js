import mongoose from "mongoose";

const schema = mongoose.Schema(
  {
    userID: { type: String, required: true },
    title: { type: String, required: true },
    createdAt: { type: Date, default: Date.now() },
    updatedAt: { type: Date, default: Date.now() },
    images: { type: Array, default: [] },
    cost: {type: Number, required: true},
    type: {type: Boolean, required: true},
    category: {type: String, required: true},
    note: {type: String, default: ""},
  },
  { collection: "bill" }
);
export default schema;