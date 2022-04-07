import express, { Request } from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import { prisma } from "./context";

const router = express.Router();

router.use(cors({ origin: true }));

router.use(async (req: Request, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    const payload = jwt.verify(token, process.env.TOKEN_SECRET || "") as {
      userId: number;
    };
    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
    });
    if (user) {
      req.user = user;
    }
  }

  next();
});

export default router;
