import jwt from "jsonwebtoken";
import { prisma } from "src/context";

export const getUserFromToken = async (token: string) => {
  try {
    const payload = jwt.verify(token, process.env.TOKEN_SECRET || "") as {
      userId: number;
    };

    return prisma.user.findUnique({
      where: { id: payload.userId },
    });
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return null;
    }

    throw error;
  }
};
