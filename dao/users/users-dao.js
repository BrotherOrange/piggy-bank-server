import usersModel from "./users-model.js";
export const findAllUsers = () => usersModel.find();
export const findUserById = (uid) => usersModel.findById(uid);
export const findUserByPhone = (phone) => usersModel.findOne({ phone: phone });
export const findUsersByNickname = (nickname) =>
  usersModel.find({ nickname: { $regex: nickname, $options: "i" } });
export const findUsersByBirth = (birth) => usersModel.find({ birthday: birth });
export const createUser = (user) => usersModel.create(user);
export const deleteUser = (uid) => usersModel.findByIdAndDelete(uid);
export const updateUser = (uid, user) =>
  usersModel.findByIdAndUpdate(uid, { $set: user });