import { appRouter } from "@/server/root";
import {
  FetchCreateContextFnOptions,
  fetchRequestHandler,
} from "@trpc/server/adapters/fetch";

const handler = (request: Request) => {
  console.log(`incoming request ${request.url}`);
  return fetchRequestHandler({
    endpoint: "/api/trpc",
    req: request,
    router: appRouter,
    createContext: function (
      _opts: FetchCreateContextFnOptions
    ): object | Promise<object> {
      return {};
    },
  });
};

export const GET = handler;
export const POST = handler;
