import { generalSocket } from "src/server";

let connectedUsers = 0;

generalSocket.on("connection", (socket) => {
  console.log("new connection on general!");

  connectedUsers += 1;
  generalSocket.emit("updateConnectedUsers", { connectedUsers });

  socket.on("disconnect", () => {
    console.log("user disconnected");
    connectedUsers -= 1;
    generalSocket.emit("updateConnectedUsers", { connectedUsers });
  });
});
