import Mongoose from "mongoose";

Mongoose.connect(process.env.DATABASE_URL || "");
