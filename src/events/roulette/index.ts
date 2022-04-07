import { rouletteSocket } from "src/server";
import { getUserFromToken } from "src/utils/getUserFromToken";
import sendGameEvents from "./output/sendGameEvents";

rouletteSocket.on("connection", async (socket) => {
  const user = await getUserFromToken(socket.handshake.auth.accessToken);
  console.log("New connection on roulette from user", user?.name);
});

sendGameEvents();
