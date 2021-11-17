import { makeSchema } from "nexus";
import * as models from "nexus-prisma";

import user from "./user";

console.log("user");

export default makeSchema({
  types: [...user, models.User],
});
