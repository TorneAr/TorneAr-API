import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const main = async () => {
  await prisma.game.upsert({
    where: { code: "roulette" },
    update: {},
    create: {
      code: "roulette",
      name: "La ruleta",
      status: "spinning",
      betSeconds: 25,
      spinSeconds: 15,
      gameData: {},
      result: "7",
      showResultSeconds: 3,
      lastResults: "",
    },
  });
};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
