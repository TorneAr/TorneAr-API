import { prisma } from "src/context";
import wait from "src/utils/wait";
import { rouletteSocket } from "src/server";

const getRandomResult = (min: number, max: number) => {
  const result = Math.floor(Math.random() * (max - min) + min);
  return result.toString();
};

const sendGameEvents = async () => {
  const roulette = await prisma.game.findUnique({
    where: { code: "roulette" },
  });
  const isSpinning = roulette?.status === "spinning";
  const nextStatus = isSpinning ? "betting" : "spinning";
  // TODO calculate the result
  const result = isSpinning ? null : getRandomResult(0, 37);
  const nextStatusDate = +(roulette?.nextStatusDate || new Date());
  const timeToWait = Math.max(0, nextStatusDate - +new Date());

  console.log(
    `Waiting ${timeToWait / 1000} seconds before sending '${nextStatus}' status`
  );

  await wait(timeToWait);

  const updatedNextStatusDate = new Date(
    Date.now() +
      (isSpinning ? roulette?.betSeconds || 0 : roulette?.spinSeconds || 0) *
        1000
  );

  // updates the game with the next status
  console.log("updating next status date", updatedNextStatusDate);
  await prisma.game.update({
    where: { code: "roulette" },
    data: { status: nextStatus, nextStatusDate: updatedNextStatusDate, result },
  });

  // sends the corresponding socket io events
  console.log("sending game events");
  if (nextStatus === "betting") {
    // indicates that the game is now in betting status
    rouletteSocket.emit("betStarted", {
      betEndDate: updatedNextStatusDate,
    });
  } else if (nextStatus === "spinning") {
    // indicates that the game is now in spinning status
    rouletteSocket.emit("betEnded", {
      betStartDate: updatedNextStatusDate,
      // TODO add users here
      result,
      users: [],
    });
  }

  sendGameEvents();
};

export default sendGameEvents;
