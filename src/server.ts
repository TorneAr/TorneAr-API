import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import express from "express";
import http from "http";
import socketIo from "socket.io";
import { createContext } from "./context";

const app = express();
const httpServer = http.createServer(app);
const io = new socketIo.Server(httpServer);

const startApolloServer = async (typeDefs: any, resolvers: any) => {
  console.log("typeDefs", typeDefs.resolvers);
  const server = new ApolloServer({
    typeDefs,
    resolvers: {
      Mutation: {
        createUser: () => {
          console.log("create useeeeer");
        },
      },
    },
    context: createContext,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  await server.start();
  server.applyMiddleware({ app });
  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 4000 }, resolve)
  );
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
};

export { app, httpServer, io, startApolloServer };
