import mongoose from "mongoose";

const schema = mongoose.Schema(
  {
    nickname: { type: String, required: true },
    phone: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    avatar: {type: String, default: '6488d23c6bd3b45e1643cba1'},
    banner: {type: String, default: '6488d2566bd3b45e1643cba3'},
    createdAt: { type: Date, default: Date.now() },
    updateAt: { type: Date, default: Date.now() },
    birthday: { type: Date, required: true },
    gender: {type: Boolean, required: true },
    bio: {type: String, default: ''},
    keywords: {type: Array, default: []},
    status: {type: Number, default: 0},
    bills: {type: Array, default: []},
    credit: {type: Number, default: 0}
  },
  { collection: "user" }
);
export default schema;