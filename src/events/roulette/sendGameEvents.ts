import { prisma } from "src/context";
import wait from "src/utils/wait";
import { rouletteSocket } from "src/server";

const sendGameEvents = async () => {
  const roulette = await prisma.game.findUnique({
    where: { code: "roulette" },
  });
  const isSpinning = roulette?.status === "spinning";
  const nextStatus = isSpinning ? "betting" : "spinning";
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
    data: { status: nextStatus, nextStatusDate: updatedNextStatusDate },
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
      nextBetDate: updatedNextStatusDate,
      // TODO calculate a result and add users here
      result: "32",
      users: [],
    });
  }

  sendGameEvents();
};

export default sendGameEvents;
