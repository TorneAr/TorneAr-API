import { rouletteSocket } from "src/server";

const getRemainingSeconds = (date: Date) => {
  const difference = +date - +new Date();
  if (difference <= 0) return 0;
  return Math.floor(difference / 1000);
};

const updateCountdown = (endDate: Date) => {
  const countdown = getRemainingSeconds(endDate);

  rouletteSocket.emit("updateCountdown", { countdown });

  if (countdown > 0) {
    setTimeout(() => updateCountdown(endDate), 1000);
  }
};

export default updateCountdown;
