import { Game } from "@prisma/client";
import { AuthenticationError, ValidationError } from "apollo-server-core";
import { extendType, nonNull, objectType, stringArg, intArg, arg } from "nexus";
import { Context } from "src/context";
import { io } from "src/server";

const BetResponse = objectType({
  name: "BetResponse",
  definition(t) {
    t.string("result");
  },
});

const GameMutations = extendType({
  type: "GameMutations",
  definition(t) {
    t.field("bet", {
      type: "BetResponse",
      args: {
        result: nonNull(stringArg({ description: "The result to bet" })),
        coins: nonNull(intArg({ description: "The amount of coins to bet" })),
      },
      async resolve(parent: Game, args, ctx: Context) {
        if (!ctx.user) {
          throw new AuthenticationError("You must be logged in");
        }

        if (args.coins > ctx.user.coins) {
          throw new ValidationError("You don't have enough coins");
        }

        await ctx.prisma.userGame.upsert({
          where: {
            userId_gameId: {
              userId: ctx.user.id,
              gameId: parent.id,
            },
          },
          create: {
            gameId: parent.id,
            userId: ctx.user.id,
            currentBetCoins: args.coins,
            currentBetResult: args.result,
          },
          update: {
            currentBetCoins: args.coins,
            currentBetResult: args.result,
          },
        });

        // Notifies the users playing the current game that a new bet has been made
        io.of(`/games/${parent.code}`).emit("betCreated", {
          userId: ctx.user.id,
          result: args.result,
          coins: args.coins,
        });

        return { result: "ok" };
      },
    });
  },
});

export default [GameMutations, BetResponse];
