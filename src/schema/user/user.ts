import { extendType, idArg, nonNull } from "nexus";
import { Context } from "src/context";

const user = extendType({
  type: "Query",
  definition(t) {
    t.field("user", {
      type: "User",
      args: {
        id: nonNull(idArg({ description: "The user's ID" })),
      },
      resolve: (parent, { id }, ctx: Context) => {
        return ctx.db.user.findUnique({ where: { id } });
      },
    });
  },
});

export default [user];
