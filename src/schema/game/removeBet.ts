import { Game } from "@prisma/client";
import { AuthenticationError, ValidationError } from "apollo-server-core";
import { extendType, nonNull, objectType, stringArg, intArg, arg } from "nexus";
import { Context } from "src/context";
import { io } from "src/server";

const RemoveBetResponse = objectType({
  name: "RemoveBetResponse",
  definition(t) {
    t.string("result");
  },
});

const GameMutations = extendType({
  type: "GameMutations",
  definition(t) {
    t.field("removeBet", {
      type: "RemoveBetResponse",
      async resolve(parent: Game, args, ctx: Context) {
        if (!ctx.user) {
          throw new AuthenticationError("You must be logged in");
        }

        await ctx.prisma.userGame.delete({
          where: {
            userId_gameId: {
              userId: ctx.user.id,
              gameId: parent.id,
            },
          },
        });

        // Notifies the users playing the current game that a bet has been removed
        io.of(`/${parent.code}`).emit("betRemoved", {
          userId: ctx.user.id,
        });

        return { result: "ok" };
      },
    });
  },
});

export default [GameMutations, RemoveBetResponse];
