import dotenv from "dotenv";

if (!process.env.NODE_ENV) {
  console.log("config dotenv");
  dotenv.config();
}
