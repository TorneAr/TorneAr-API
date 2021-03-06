import { Game } from ".prisma/client";
import { extendType, nonNull, objectType, stringArg } from "nexus";
import { Context } from "src/context";

const ExtendedGame = extendType({
  type: "Game",
  definition(t) {
    t.int("nextStatusIn", {
      resolve(parent: Game, args, ctx: Context) {
        const timeToWait = Math.max(
          0,
          +new Date(parent.nextStatusDate) - +new Date()
        );

        return timeToWait;
      },
    });
    t.list.string("lastResults", {
      resolve(parent: Game, args, ctx: Context) {
        return (parent.lastResults || "").split(",").filter((x) => x);
      },
    });
  },
});

const GameMutations = objectType({
  name: "GameMutations",
  definition(t) {},
});

const game = extendType({
  type: "Query",
  definition(t) {
    t.field("game", {
      type: "Game",
      args: {
        code: nonNull(stringArg({ description: "The game code" })),
      },
      resolve: async (parent, args, ctx: Context) => {
        const game = await ctx.prisma.game.findUnique({
          where: { code: args.code },
        });

        return game;
      },
    });
  },
});

const gameMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field("game", {
      type: "GameMutations",
      args: {
        code: nonNull(stringArg({ description: "The game code" })),
      },
      resolve: async (parent, args, ctx: Context) => {
        const game = await ctx.prisma.game.findUnique({
          where: { code: args.code },
        });

        return game;
      },
    });
  },
});

export default [game, gameMutation, ExtendedGame, GameMutations];
