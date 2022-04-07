import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import express from "express";
import http from "http";
import socketIo from "socket.io";
import middlewares from "./middlewares";
import { createContext } from "./context";

const app = express();
const httpServer = http.createServer(app);
const io = new socketIo.Server(httpServer);

app.use(middlewares);

const startApolloServer = async (typeDefs: any, resolvers: any) => {
  const port = process.env.PORT || 4000;
  const server = new ApolloServer({
    schema: typeDefs,
    context: createContext,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  await server.start();
  server.applyMiddleware({ app });
  await new Promise<void>((resolve) => httpServer.listen({ port }, resolve));
  console.log(
    `🚀 Server ready at http://localhost:${port}${server.graphqlPath}`
  );
};

const rouletteSocket = io.of("/games/roulette");
const generalSocket = io.of("/general");

export {
  app,
  httpServer,
  io,
  generalSocket,
  rouletteSocket,
  startApolloServer,
};
