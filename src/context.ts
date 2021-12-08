import { PrismaClient } from ".prisma/client";

export const prisma = new PrismaClient();

export type Context = {
  prisma: PrismaClient;
};

export const createContext = (_req: Request, _res: Response): Context => ({
  prisma,
});
