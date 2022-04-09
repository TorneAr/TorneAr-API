import { extendType, intArg, nonNull } from "nexus";
import { Context } from "src/context";

const user = extendType({
  type: "Query",
  definition(t) {
    t.field("currentUser", {
      type: "User",
      resolve: async (parent, { id }, ctx: Context) => {
        return ctx.user;
      },
    });
  },
});

export default [user];
