import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const main = async () => {
  await prisma.user.upsert({
    where: { email: "lefcott@hotmail.com" },
    update: {},
    create: {
      name: "Leandro",
      surname: "Cotti",
      nickname: "lefcott",
      email: "lefcott@hotmail.com",
      password: "$2a$10$GhRiGysM.MedL5/rpfWYVeJ3fZyJ.Yg9zw28OS0P52kDZhXWt7pSG",
      phone: "+5491130696440",
      emailConfirmed: false,
      coins: 200000,
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
