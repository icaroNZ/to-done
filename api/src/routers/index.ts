import todoRouter from "./todoRoute.ts";
import todoOrderRouter from "./todoOrderRouter.ts";
import { Application } from "../../deps.ts";

const apiVersion = Deno.env.get("API_VERSION");
const apiUrl = `/api/${apiVersion}`;
const initRouters = (app: Application) => {
  app.use(todoRouter(apiUrl).routes());
  app.use(todoOrderRouter(apiUrl).routes());
};

export default initRouters;
