import Mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  phone: { type: String },
  nickname: { type: String, reqiured: true },
  email: { type: String, reqiured: true },
  password: { type: String, reqiured: true },
  emailConfirmed: { type: String, default: false },
  coins: { type: String, default: 0 },
});

export default Mongoose.model("User", UserSchema);
