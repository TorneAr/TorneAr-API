import Mongoose, { Schema } from "mongoose";

const GameSchema = new Schema({
  name: { type: String, required: true }, // Descriptive name of the game
  code: { type: String, required: true }, // It's useful for identifying the game
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
  betSeconds: { type: Number, required: true }, // Seconds the user has to bet
  spinSeconds: { type: Number, required: true }, // Time the spin will last
  gameData: {},
});

export default Mongoose.model("Game", GameSchema);
