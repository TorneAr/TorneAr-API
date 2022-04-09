import { User } from "@prisma/client";
import { PrismaClient } from ".prisma/client";
import { Request } from "express";

export const prisma = new PrismaClient();

export type Context = {
  user?: User;
  prisma: PrismaClient;
};

export const createContext = ({
  req,
}: {
  req: Request;
  res: Response;
}): Context => {
  return {
    user: req.user,
    prisma,
  };
};
