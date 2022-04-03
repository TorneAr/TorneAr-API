import { Game } from ".prisma/client";
import wait from "src/utils/wait";

const waitForStatusChange = async (game: Game, nextStatus: string) => {
  const nextStatusDate = +(game.nextStatusDate || new Date());
  const timeToWait = Math.max(0, nextStatusDate - +new Date());

  console.log(
    `Waiting ${timeToWait / 1000} seconds before sending '${nextStatus}' status`
  );

  await wait(timeToWait);
};

export default waitForStatusChange;
