import "./env";
import { startApolloServer } from "./server";
import "./database";
import schema from "./schema";
import "./events";

startApolloServer(schema, {});
