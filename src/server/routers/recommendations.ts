import { createTRPCRouter, publicProcedure } from "../trpc";

export type MusicRecommendation = {
  title: string;
  author: string;
};

export const recommendationsRouter = createTRPCRouter({
  get: publicProcedure.query(() => {
    const musics: MusicRecommendation[] = [
      {
        title: "The Empress",
        author: "Undead Corporation Doujin Works",
      },
    ];

    const repeatedArray = Array.from({ length: 6 }, () => musics).flat();
    const repeatedAgain = Array.from({ length: 4 }, () => repeatedArray);

    return repeatedAgain;
  }),
});
