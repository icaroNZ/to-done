import { Application /*, oakCors */ } from "../deps.ts";
import initRouters from "./routers/index.ts";
import notFound from "./middlewares/notFound.ts";
import startListeningForTerminationSignal from "./utils/SignalManager.ts";

const controller = new AbortController();
const { signal } = controller;
startListeningForTerminationSignal(controller);

const URL = Deno.env.get("URL") || "http://localhost";
const PORT = +(Deno.env.get("PORT") || 3001);

const app = new Application();

//app.use(setContentType);
//const allowedOrigins = oakCors({ origin: "http://localhost:3000" });

//app.use(allowedOrigins);

initRouters(app);

app.use(notFound);

app.addEventListener("listen", () => {
  console.log(`Server listening at ${URL}:${PORT}`);
});

await app.listen({ port: PORT, signal });
