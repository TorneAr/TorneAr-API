import { io } from "../../../server";

io.of("/roulette").on("connection", (socket) => {
  console.log("new connection!");

  // TODO add events for the game here
  socket.on("join", (data) => {
    console.log("received join event");
  });
});
