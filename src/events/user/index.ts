import { userSocket } from "src/server";
import { getUserFromToken } from "src/utils/getUserFromToken";

userSocket.on("connection", async (socket) => {
  const user = await getUserFromToken(socket.handshake.auth.accessToken);

  if (user) {
    socket.join(`/users/${user.id}`);
  }

  console.log("New connection on namespace 'user' from user", user?.name);
});
