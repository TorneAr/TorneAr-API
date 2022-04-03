import { prisma } from "src/context";
import wait from "src/utils/wait";
import { rouletteSocket } from "src/server";
import updateCountdown from "./updateCountdown";
import waitForStatusChange from "./waitForStatusChange";
import getLastNResults from "./getLastNResults";

const getRandomResult = (min: number, max: number) => {
  const result = Math.floor(Math.random() * (max - min) + min);
  return result.toString();
};

const sendGameEvents = async () => {
  const roulette = await prisma.game.findUnique({
    where: { code: "roulette" },
  });

  if (!roulette) {
    console.log("roulette not found");
    return;
  }

  const isSpinning = roulette.status === "spinning";
  const nextStatus = isSpinning ? "betting" : "spinning";
  // TODO calculate the result
  const result = isSpinning ? null : getRandomResult(0, 37);
  const lastResults = getLastNResults(roulette, result, 4);
  console.log("lastResults", lastResults);

  await waitForStatusChange(roulette, nextStatus);

  // Shows the spinning result for a time before starting the next bet
  if (nextStatus === "betting") {
    console.log("showing the result for a time");
    await wait((roulette.showResultSeconds || 0) * 1000);
  }

  const updatedNextStatusDate = new Date(
    Date.now() +
      (isSpinning ? roulette.betSeconds || 0 : roulette.spinSeconds || 0) * 1000
  );

  // updates the game with the next status
  console.log("updating next status date", updatedNextStatusDate);
  await prisma.game.update({
    where: { code: "roulette" },
    data: {
      status: nextStatus,
      nextStatusDate: updatedNextStatusDate,
      result,
      lastResults,
    },
  });

  // sends the corresponding socket io events
  console.log("sending game events");
  if (nextStatus === "betting") {
    // indicates that the game is now in betting status
    rouletteSocket.emit("betStarted", {
      nextStatusIn: Math.max(0, +new Date(updatedNextStatusDate) - +new Date()),
      lastResults: lastResults.split(",").filter((x) => x),
    });
    updateCountdown(updatedNextStatusDate);
  } else if (nextStatus === "spinning") {
    // indicates that the game is now in spinning status
    rouletteSocket.emit("betEnded", {
      nextStatusIn: Math.max(0, +new Date(updatedNextStatusDate) - +new Date()),
      result,
      // TODO add users here
      users: [],
    });
  }

  sendGameEvents();
};

export default sendGameEvents;
