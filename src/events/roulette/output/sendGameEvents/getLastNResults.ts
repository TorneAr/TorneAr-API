import { Game } from ".prisma/client";

const getLastNResults = (game: Game, newResult: string | null, n: number) => {
  if (!newResult) return game.lastResults || "";
  const lastResults = (game.lastResults || "").split(",").filter((x) => x);
  return [newResult, ...lastResults].slice(0, n).join(",");
};

export default getLastNResults;
