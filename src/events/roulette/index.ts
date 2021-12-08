import { rouletteSocket } from "src/server";
import sendGameEvents from "./sendGameEvents";

rouletteSocket.on("connection", (socket) => {
  console.log("new connection on roulette!");

  socket.on("join", (data) => {
    console.log("received join event");
  });
});

sendGameEvents();
