import { Prisma } from "@prisma/client";
import { prisma } from "../../../lib/prisma";
import { createTRPCRouter, publicProcedure } from "../trpc";
import _ from "underscore";
import { MusicType } from "@/shared/enum";

const musicRecommendation = Prisma.validator<Prisma.SongArgs>()({
  select: {
    id: true,
    title: true,
    artist: {
      select: {
        information: {
          select: {
            displayName: true,
          },
        },
      },
    },
  },
});

export const recommendationsRouter = createTRPCRouter({
  get: publicProcedure.query(async (): Promise<MusicRecommendation[][]> => {
    const fetched = await prisma.song.findMany({
      ...musicRecommendation,
      take: 50,
    });

    const results = fetched
      .concat(
        _.times(8, () => [
          {
            id: "O",
            title: "The Empress",
            artist: {
              information: {
                displayName: "Undead Corporation",
              },
            },
          },
          {
            id: "1",
            title: "From Under Cover (Caught Up In A Love Song)",
            artist: {
              information: {
                displayName: "Foreground Eclipse",
              },
            },
          },
          {
            id: "2",
            title: "Circo Inhumanitas",
            artist: {
              information: {
                displayName: "Cattle Decapitation",
              },
            },
          },
        ]).flat()
      )
      .flat();

    return _.chain(results)
      .map((value) => ({ ...value, type: MusicType.Server }))
      .groupBy((result) => result.title)
      .toArray()
      .value();
  }),
});


export type MusicRecommendation = Prisma.SongGetPayload<
  typeof musicRecommendation
> & {
  type: MusicType;
};
