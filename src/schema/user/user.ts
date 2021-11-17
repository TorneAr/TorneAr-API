import { User } from "nexus-prisma";
import { makeSchema, objectType } from "nexus";
import { getDefinition } from "src/utils/getDefinition";

export default makeSchema({
  types: [
    objectType({
      name: User.$name,
      description: User.$description,
      definition: getDefinition(User),
    }),
  ],
});
