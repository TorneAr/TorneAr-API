import { extendType, stringArg } from "nexus";

import bcrypt from "bcryptjs";

import { Context } from "src/context";

const createUser = extendType({
  type: "Mutation",
  definition(t) {
    t.field("createUser", {
      type: "User",
      description: "Creates a new user",
      args: {
        name: stringArg({ description: "The user's name" }),
        surname: stringArg({ description: "The user's surname" }),
        phone: stringArg({ description: "The user's phone" }),
        nickname: stringArg({ description: "The user's nickname" }),
        email: stringArg({ description: "The user's email" }),
        password: stringArg({ description: "The user's plain password" }),
      },
      resolve: (parent, args, ctx: Context) => {
        console.log("create user");
        const password = bcrypt.hashSync(args.password, 10);

        return { ok: true };

        return ctx.db.user.create({
          data: {
            ...args,
            password,
          },
        });
      },
    });
  },
});

console.log("createUser", createUser);

export default [createUser];
