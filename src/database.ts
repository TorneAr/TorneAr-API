import Mongoose from "mongoose";

import "./models";

Mongoose.connect(process.env.DATABASE_URL || "");
