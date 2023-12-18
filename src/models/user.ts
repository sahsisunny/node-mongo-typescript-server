import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  authentication: {
    password: { type: String, required: true, select: false },
    salt: { type: String, required: true, select: false },
    sessionToken: { type: String, required: true, select: false },
  },
});

export const UserModel = mongoose.model("User", userSchema);

export const getUser = async (username: string) => {
  return await UserModel.findOne({ username }).select(
    "+authentication.salt +authentication.password"
  );
};

export const getUsers = () => UserModel.find();

export const getUserByEmail = async (email: string) => {
  return await UserModel.findOne({ email });
};

export const getUserBySessionToken = async (sessionToken: string) => {
  return await UserModel.findOne({
    "authentication.sessionToken": sessionToken,
  });
};

export const createUser = async (value: Record<string, unknown>) => {
  return await UserModel.create(value);
};

export const updateUser = async (user: Record<string, unknown>) => {
  return await UserModel.updateOne({ _id: user._id }, user);
};

export const deleteUser = async (userId: string) => {
  return await UserModel.deleteOne({ _id: userId });
};
