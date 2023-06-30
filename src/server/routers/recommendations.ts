import { prisma } from "../../../lib/prisma";
import { createTRPCRouter, publicProcedure } from "../trpc";
import _ from "underscore";
import { MusicType } from "@/shared/enum";
import { inferTransformedProcedureOutput } from "@trpc/server/shared";

export const recommendationsRouter = createTRPCRouter({
  get: publicProcedure.query(async () => {
    const fetched = await prisma.song.findMany({
      take: 25,
      select: {
        id: true,
        title: true,
        genre: true,
        cover: true,
        artist: {
          select: {
            name: true,
          },
        },
      },
    });

    return _.chain(fetched.flat())
      .map((r) => ({
        ...r,
        type: MusicType.Server,
      }))
      .groupBy((r) => r.genre)
      .toArray()
      .value();
  }),
});

export type MusicRecommendation = inferTransformedProcedureOutput<
  (typeof recommendationsRouter)["get"]
>[number][number];
