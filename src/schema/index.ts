import { makeSchema, objectType } from "nexus";
import * as models from "nexus-prisma";
import { getDefinition } from "src/utils/getDefinition";

import user from "./user";

const filteredModels = Object.fromEntries(
  Object.entries(models).filter(([name]) => !name.startsWith("$"))
);

const modelSchemas = Object.entries(filteredModels).map(([name, model]) =>
  makeSchema({
    types: [
      objectType({
        name: name,
        // @ts-ignore
        description: model.$description,
        definition: getDefinition(model),
      }),
    ],
  })
);

export default makeSchema({
  types: [...modelSchemas, ...user],
});
