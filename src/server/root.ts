import { recommendationsRouter } from "./routers/recommendations";
import { createTRPCRouter } from "./trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  recommendations: recommendationsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
