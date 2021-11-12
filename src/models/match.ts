import Mongoose, { Schema } from "mongoose";

const MatchSchema = new Schema({
  userId: { type: Mongoose.Types.ObjectId, ref: "User" },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  coinsBet: { type: Number, required: true },
  coinsEarned: { type: Number, required: true },
  profit: { type: Number, required: true },
  movements: [
    {
      coinsBet: { type: Number, required: true },
      coinsEarned: { type: Number, required: true },
      profit: { type: Number, required: true },
    },
  ],
});

export default Mongoose.model("Match", MatchSchema);
