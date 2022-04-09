import { Game } from "@prisma/client";
import { prisma } from "src/context";
import { userSocket } from "src/server";
import { getPaymentFactor } from "./utils/getPaymentFactor";

const endGame = async (game: Game, result: string) => {
  const gameBets = await prisma.userGame.findMany({
    where: { gameId: game.id },
    include: { user: true },
  });

  gameBets.forEach(async (gameBet) => {
    const paymentFactor = getPaymentFactor(gameBet.currentBetResult, result);
    const payment = gameBet.currentBetCoins * paymentFactor;
    const newCoins = gameBet.user.coins + payment;

    if (payment > 0) {
      await prisma.user.update({
        where: { id: gameBet.userId },
        data: { coins: newCoins },
      });
      userSocket
        .to(`/users/${gameBet.userId}`)
        .emit("coinsUpdated", { coins: newCoins });
    }
  });

  await prisma.userGame.deleteMany({ where: { gameId: game.id } });
};

export default endGame;
