import "module-alias/register";
import "source-map-support/register";

import "./env";
import { startApolloServer } from "./server";
import "./database";
import schema from "./schema";
import "./events";

startApolloServer(schema, {});
