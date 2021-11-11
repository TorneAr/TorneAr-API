import {
  arg,
  enumType,
  intArg,
  interfaceType,
  makeSchema,
  objectType,
  queryType,
  stringArg,
  list,
} from "nexus";

const Node = interfaceType({
  name: "Node",
  definition(t) {
    t.id("id", { description: "Unique identifier for the resource" });
  },
  resolveType(parent) {},
});

const Account = objectType({
  name: "Account",
  isTypeOf(source) {
    return "email" in source;
  },
  definition(t) {
    t.implements(Node); // or t.implements("Node")
    t.string("username");
    t.string("email");
  },
});

const StatusEnum = enumType({
  name: "StatusEnum",
  members: ["ACTIVE", "DISABLED"],
});
const Query = queryType({
  definition(t) {
    t.field("account", {
      type: Account, // or "Account"
      args: {
        name: stringArg(),
        status: arg({ type: "StatusEnum" }),
      },
    });
    t.field("accountsById", {
      type: list(Account), // or "Account"
      args: {
        ids: list(intArg()),
      },
    });
  },
});

// Recursively traverses the value passed to types looking for
// any valid Nexus or graphql-js objects to add to the schema,
// so you can be pretty flexible with how you import types here.
export default makeSchema({
  types: [Node, Account, Query, StatusEnum],
});
