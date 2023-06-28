import { appRouter } from "@/server/root";
import { createContext } from "@/shared/trpc/trpc-context";
import {
  fetchRequestHandler,
} from "@trpc/server/adapters/fetch";

const handler = (request: Request) => {
  console.log(`incoming request ${request.url}`);
  return fetchRequestHandler({
    endpoint: "/api/trpc",
    req: request,
    router: appRouter,
    createContext,
  });
};

export const GET = handler;
export const POST = handler;
