import { Application, Router } from '../deps.ts';
import initRouters from './routers/index.ts';
import MongoDatabase from './helper/mongodb.ts';

const URL = Deno.env.get('URL') || 'http://localhost';
const PORT = +(Deno.env.get('PORT') || 3001);

const app = new Application();

initRouters(app);

app.addEventListener('listen', () => {
  console.log(`Server listening at ${URL}:${PORT}`);
});

await app.listen({ port: PORT });
