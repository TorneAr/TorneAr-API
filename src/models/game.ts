import Mongoose, { Schema } from "mongoose";

const GameSchema = new Schema({
  name: { type: String, required: true },
  code: { type: String, required: true },
  status: { type: String, required: true }, // "betStarted" or "spinning"
  nextStatusDate: { type: Date, required: true },
  activeUsers: [
    {
      _id: { type: String, required: true },
      nickname: { type: String, required: true },
      bet: {
        result: { type: String },
        coins: { type: Number },
      },
    },
  ],
  betSeconds: { type: Number, required: true },
  spinSeconds: { type: Number, required: true },
  gameData: {},
});

export default Mongoose.model("Game", GameSchema);
