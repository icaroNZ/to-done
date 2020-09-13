import { RouterContext } from "../../deps.ts";

type Next = () => Promise<void>;

export default async (context: RouterContext, next: Next) => {
  await next();
  context.response.headers.set("Content-Type", "application/json");
};
