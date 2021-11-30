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
      resolve: async (parent, { id }, ctx: Context) => {
        console.log("find with id", id);
        let user = await ctx.prisma.user.findUnique({
          where: { id },
          include: { matches: true },
        });

        // @ts-ignore
        // user = { ...user, matches: [{ coinsBet: 32 }] };

        console.log("user", user);

        return user;
      },
    });
  },
});

export default [user];
