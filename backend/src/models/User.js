import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  user_id: {
    type: String,
    required: [true, "user_id field is required."],
  },
  username: {
    type: String,
    required: [true, "username field is required."],
  },
  password: {
    type: String,
    required: [true, "password field is required."],
  },
});

const User = mongoose.model("User", UserSchema);

export default User;
