import { PrismaClient } from ".prisma/client";

const db = new PrismaClient();

export type Context = {
  db: PrismaClient;
};

export const createContext = (_req: Request, _res: Response): Context => ({
  db,
});
