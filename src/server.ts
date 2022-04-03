import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import express from "express";
import http from "http";
import socketIo from "socket.io";
import cors from "cors";
import { createContext } from "./context";

const app = express();
const httpServer = http.createServer(app);
const io = new socketIo.Server(httpServer);

app.use(cors({ origin: true }));

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

const rouletteSocket = io.of("/roulette");
const generalSocket = io.of("/general");

export { app, httpServer, generalSocket, rouletteSocket, startApolloServer };
